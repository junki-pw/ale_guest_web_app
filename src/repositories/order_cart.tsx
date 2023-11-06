import { doc_not_found } from "@/constants/error";
import {
  desc,
  kOrderRoomId,
  menusCollection,
  orderCartsCollection,
  orderHistoriesCollection,
  orderRoomsCollection,
  shopsCollection,
} from "@/constants/firebase";
import { updatedAt, isActive, isDeleted } from "@/constants/keys";
import { OrderCart, orderCartFromJson } from "@/domain/order_cart";
import { OrderRoom, orderRoomFromJson } from "@/domain/order_room";
import { Shop } from "@/domain/shop";
import { ShopMenu, shopMenuFromJson } from "@/domain/shop_menu";
import { MenuOption } from "@/domain/shop_option";
import { AppUser } from "@/domain/user";
import { db } from "@/providers/firebase";
import { calcMenuAmount } from "@/services/calc/menu";
import { convertIsReducedTaxRate } from "@/services/convert/string";
import { searchMenu, searchOption } from "@/services/methods/search";
import {
  DocumentData,
  Query,
  QueryConstraint,
  Unsubscribe,
  collection,
  doc,
  endAt,
  getCountFromServer,
  getDoc,
  getDocs,
  getDocsFromCache,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { createOrderCart } from "@/services/create/order_cart";
import { OrderHistory } from "@/domain/order_history";
import { createOrderHistory } from "@/services/create/order_history";
import { getCurrentDateTime } from "./server_timestamp";
import { getTodayNormalBHs } from "./normal_bh";
import { NormalBH } from "@/domain/normal_bh";
import { HolidayBH } from "@/domain/holiday_bh";
import { getTodayHolidayBHs } from "./holiday_bh";
import { checkIsOpening } from "@/services/convert/check_is_opening";
import { getMenus } from "./shop_menu";
import { MenuCategory } from "@/domain/menu_category";
import { getCategories } from "./menu_category";
import { checkIsServiceAvailable } from "@/services/convert/check_is_service_available";

const collectionRef = () => collection(db, orderCartsCollection);

const mainQuery: (
  orderRoomId: string,
  queryConstraint: QueryConstraint[]
) => Query<DocumentData, DocumentData> = (
  orderRoomId: string,
  queryConstraint: QueryConstraint[]
) =>
  query(
    collectionRef(),
    where(kOrderRoomId, "==", orderRoomId),
    orderBy(updatedAt, desc),
    ...queryConstraint
  );

export const getOrderCartById = async (orderCartId: string) => {
  const d = doc(db, orderCartsCollection, orderCartId);

  return await getDoc(d).then((value) => {
    if (value.data() == null) {
      throw doc_not_found;
    }
    return orderCartFromJson(value.data()!);
  });
};

export const streamOrderCartsByOrderRoomId: (
  orderRoomId: string,
  onNext: (orderCarts: OrderCart[]) => void
) => Promise<void | Unsubscribe> = async (
  orderRoomId: string,
  onNext: (orderCarts: OrderCart[]) => void
) => {
  return await getQuery(orderRoomId).then((query) => {
    onSnapshot(query, async (snapshot) => {
      console.log("snapshot リッスン");

      // localからデータを全て取得する
      return onNext(await getLocalOrderCarts(orderRoomId));
    });
  });
};

export const getOrderedCount: (orderRoomId: string) => Promise<number> = async (
  orderRoomId: string
) => {
  const query = mainQuery(orderRoomId, [where(isDeleted, "==", false)]);
  return await getCountFromServer(query).then((value) => value.data().count);
};

/// 最新のアクティブなデータを全て取得する
/// キャッシュを活用するためデータ取得量はかなり控えめ
export const getOrderCarts: (
  orderRoomId: string
) => Promise<OrderCart[]> = async (orderRoomId: string) =>
  await getQuery(orderRoomId).then(
    async (query) =>
      await getDocs(query).then(
        async (value) => await getLocalOrderCarts(orderRoomId)
      )
  );

const getQuery: (
  orderRoomId: string
) => Promise<Query<DocumentData, DocumentData>> = async (
  orderRoomId: string
) => {
  const q = mainQuery(orderRoomId, [limit(1)]);

  return getDocsFromCache(q).then((value) =>
    value.docs.length == 0
      ? mainQuery(orderRoomId, [where(isDeleted, "==", false)])
      : mainQuery(orderRoomId, [endAt(value.docs[0])])
  );
};

export const getLocalOrderCarts: (
  orderRoomId: string
) => Promise<OrderCart[]> = async (orderRoomId: string) => {
  const q = mainQuery(orderRoomId, [where(isDeleted, "==", false)]);

  return getDocsFromCache(q).then((value) =>
    value.docs.map((e) => orderCartFromJson(e.data()))
  );
};

interface saveOrderCartProps {
  orderRoom: OrderRoom;
  shop: Shop;
  userIds: any[];
  currentUser: AppUser;
  menuId: string;
  options: MenuOption[];
  menus: ShopMenu[];
  selectedOptions: {};
  previousOrderCart: OrderCart | null;
}

export async function saveOrderCart({
  orderRoom,
  shop,
  userIds,
  currentUser,
  menuId,
  options,
  menus,
  selectedOptions,
  previousOrderCart,
}: saveOrderCartProps) {
  const orderedMenuAmount = calcMenuAmount({
    menu: searchMenu(menus, menuId),
    optionList: options,
    options: selectedOptions,
    orderCount: userIds.length,
    shop,
    isReducedTaxRate: convertIsReducedTaxRate(shop),
    discounts: [],
  });

  //todo 必須オプションチェック
  const orderCart =
    previousOrderCart == null
      ? createOrderCart({
          orderCartId: uuidv4(),
          orderRoomId: orderRoom.orderRoomId,
          shop,
          userIds: userIds as any,
          selectedOptions,
          menuId,
          currentUser,
          orderedMenuAmount,
        })
      : {
          ...previousOrderCart,
          options: selectedOptions,
          orderedMenuAmount,
          updatedAt: serverTimestamp(),
        };

  /// 必須オプションで選択しているかチェック
  for (const [optionId, menuIds] of Object.entries(orderCart.options)) {
    const option: MenuOption = searchOption(options, optionId);
    if (option.isRequiredOption && (menuIds as any).isEmpty) {
      throw Error("必須の項目で選択されていないオプションがあるようです");
    }
  }

  await runTransaction(db, async (t) => {
    const orderRoomDocRef = doc(
      db,
      orderRoomsCollection,
      orderRoom.orderRoomId
    );

    const latestOrderRoom: OrderRoom = await t
      .get(orderRoomDocRef)
      .then((value) => {
        if (value.data() == null) {
          throw Error(doc_not_found);
        }
        return orderRoomFromJson(value.data()!);
      });

    if (!latestOrderRoom.onOrder) {
      throw Error(
        "オーダーストップしているため送信できませんでした\nオーダーするためには現在のお会計をキャンセルする必要があります"
      );
    }

    const orderCartDocRef = doc(
      db,
      orderCartsCollection,
      orderCart.orderCartId
    );

    const latestOrderCart: OrderCart | null = await t
      .get(orderCartDocRef)
      .then((value) => {
        if (value.data() == null) {
          return null;
        }
        return orderCartFromJson(value.data()!);
      });

    if (latestOrderCart?.orderId != null) {
      /// 既に注文済みのためエラーを出す
      throw Error("alreadyOrdered");
    }

    // order_room を更新
    t.update(orderRoomDocRef, {
      orderCartCount: increment(1),
      updatedAt: serverTimestamp(),
    });

    if (latestOrderCart == null) {
      /// 新規作成
      const newOrderCart: OrderCart = {
        ...orderCart,
        orderCartNumber: latestOrderRoom.orderCartCount + 1,
      };
      t.set(orderCartDocRef, newOrderCart);
    } else {
      /// アップデート
      t.update(orderCartDocRef, {
        ...orderCart,
      });
    }
  }).catch((e) => {
    throw e;
  });
}

interface UpdateOrderCartUserIdsProps {
  isAdd: boolean;
  orderCartId: string;
  currentUserId: string;
  shop: Shop;
  menus: ShopMenu[];
  options: MenuOption[];
}

export async function updateOrderCartUserIds({
  isAdd,
  orderCartId,
  currentUserId,
  shop,
  menus,
  options,
}: UpdateOrderCartUserIdsProps) {
  await runTransaction(db, async (t) => {
    //todo
    const orderCartDocRef = doc(db, orderCartsCollection, orderCartId);

    const latestOrderCart: OrderCart = await t
      .get(orderCartDocRef)
      .then((value) => {
        if (value.data() == null) {
          throw doc_not_found;
        }

        return orderCartFromJson(value.data()!);
      });

    if (latestOrderCart.orderId != null) {
      throw "既に注文しているためデータを更新できませんでした";
    }

    let userIds: string[] = [];
    if (isAdd) {
      userIds = [...latestOrderCart.userIds, currentUserId];
    } else {
      /// 同じidでも2回目以降はuserIdsに追加する
      let isDuplicateCheck: boolean = true;
      for (const userId of latestOrderCart.userIds) {
        if (userId == currentUserId && isDuplicateCheck) {
          isDuplicateCheck = false;
        } else {
          userIds = [...userIds, userId];
        }
      }
    }

    const menu: ShopMenu = searchMenu(menus, latestOrderCart.menuId);

    const orderedAmount: number = calcMenuAmount({
      menu,
      optionList: options,
      options: latestOrderCart.options,
      orderCount: userIds.length,
      shop,
      isReducedTaxRate: latestOrderCart.isReducedTaxRate,
      discounts: latestOrderCart.corrects,
    });

    t.update(orderCartDocRef, {
      orderedAmount: orderedAmount,
      userIds: userIds,
      updatedAt: serverTimestamp(),
    });
  });
}

interface deleteOrderCartProps {
  currentUser: AppUser;
  orderCart: OrderCart;
}

export async function deleteOrderCart({
  currentUser,
  orderCart,
}: deleteOrderCartProps) {
  await runTransaction(db, async (t) => {
    const orderRoomDocRef = doc(
      db,
      orderRoomsCollection,
      orderCart.orderRoomId
    );

    const latestOrderRoom = await t
      .get(orderRoomDocRef)
      .then((value) => orderRoomFromJson(value.data()!));

    if (!latestOrderRoom.onOrder) {
      throw "オーダーストップのため処理を完了できませんでした\nホストにオーダーを再開するようにお伝えください";
    }

    const orderCartDocRef = doc(
      db,
      orderCartsCollection,
      orderCart.orderCartId
    );

    const latestOrderCart = await t
      .get(orderCartDocRef)
      .then((value) => orderCartFromJson(value.data()!));

    if (latestOrderCart.orderId != null) {
      throw "既に注文しているためデータを更新できませんでした";
    }

    t.update(orderCartDocRef, {
      updatedAt: serverTimestamp(),
      isDeleted: true,
      deletedAt: serverTimestamp(),
      deleteUserId: currentUser.userId,
      deleteUserName: currentUser.userName,
      deleteUserIcon: currentUser.userIcon,
    });
  });
}

interface confirmOrderCartProps {
  orderRoom: OrderRoom;
  orderCarts: OrderCart[];
  currentUser: AppUser;
}

export async function confirmOrderCart({
  orderRoom,
  orderCarts,
  currentUser,
}: confirmOrderCartProps) {
  const orderHistory: OrderHistory = createOrderHistory({
    orderId: uuidv4(),
    senderId: currentUser.userId,
    senderName: currentUser.userName,
    senderIcon: currentUser.userIcon,
    shopId: orderRoom.shopId,
  });

  await runTransaction(db, async (t) => {
    const orderRoomDocRef = doc(
      db,
      orderRoomsCollection,
      orderRoom.orderRoomId
    );

    const latestOrderRoom = await t
      .get(orderRoomDocRef)
      .then((value) => orderRoomFromJson(value.data()!));

    if (!latestOrderRoom.onOrder) {
      throw "オーダーがストップされています\nお会計をキャンセルしてご注文して下さい";
    }

    const currentDateTime: Date = await getCurrentDateTime();
    const normalBHs: NormalBH[] = await getTodayNormalBHs(
      currentDateTime,
      orderRoom.shopId
    );
    const holidayBHs: HolidayBH[] = await getTodayHolidayBHs(
      currentDateTime,
      latestOrderRoom.shopId
    );

    const isOpen: boolean = checkIsOpening({
      currentDateTime,
      normalBHs,
      holidayBHs,
    });

    if (!isOpen) {
      throw "営業時間外のため\nオーダー出来ませんでした";
    }

    const menus: ShopMenu[] = await getMenus(latestOrderRoom.shopId);

    let latestOrderCarts: OrderCart[] = [];
    for (const orderCart of orderCarts) {
      const orderCartDocRef = doc(
        db,
        orderCartsCollection,
        orderCart.orderCartId
      );

      const latestOrderCart = await t
        .get(orderCartDocRef)
        .then((value) => orderCartFromJson(value.data()!));

      const menu: ShopMenu = searchMenu(menus, orderCart.menuId);

      if (orderCart.isDeleted) {
        throw Error(
          `既に削除されたデータがある為\n送信をストップしました\nメニュー名\n${menu.menuName}`
        );
      } else if (orderCart.orderId != null) {
        throw Error(
          `既に注文されているデータがある為\n送信をストップしました\nメニュー名\n${menu.menuName}`
        );
      }

      latestOrderCarts = [...latestOrderCarts, latestOrderCart];
    }

    if (latestOrderCarts.length == 0) {
      throw Error("カートが1つも無いため処理を途中でストップしました");
    }

    const categories: MenuCategory[] = await getCategories(
      latestOrderRoom.shopId
    );

    let menuIds: string[] = [];
    for (const latestOrderCart of latestOrderCarts) {
      /// カートに含まれているメニューId
      if (
        latestOrderCart.menuId != null &&
        !menuIds.includes(latestOrderCart.menuId)
      ) {
        menuIds = [...menuIds, latestOrderCart.menuId];
      }

      /// 通常メニューのオプションs
      for (const value of Object.values(latestOrderCart.options)) {
        for (const menuId of value as []) {
          if (!menuIds.includes(menuId)) {
            menuIds = [...menuIds, menuId];
          }
        }
      }
    }

    /// { menuId : 0 }
    let menuCountMap = {}; // メニューの注文合計数
    let latestMenus: ShopMenu[] = [];

    for (var menuId of menuIds) {
      menuCountMap = {
        ...menuCountMap,
        [`${menuId}`]: 0,
      };

      // menu docRef
      const menuDocRef = doc(
        db,
        shopsCollection,
        latestOrderRoom.shopId,
        menusCollection,
        menuId
      );

      const latestMenu = await t.get(menuDocRef).then((value) => {
        if (value.data() == null) {
          throw doc_not_found;
        }
        return shopMenuFromJson(value.data()!);
      });

      latestMenus = [...latestMenus, latestMenu];

      /// 売り切れチェック
      if (latestMenu.soldOutType != "onSale") {
        throw Error(
          "${menu.menuName} は" +
            `${
              latestMenu.soldOutType == "today"
                ? "本日売り切れ"
                : "再販予定なし"
            }のため、` +
            "カートから削除して再度オーダーし直して下さい"
        );
      }

      /// カテゴリー提供時間をチェック
      /// 営業時間内とは別の問題でランチなのかディナーなのかを判別する場合がある
      const categoryIndex = categories.findIndex((element) =>
        (latestMenu.categoryIds as any).includes(element.categoryId)
      );

      if (categoryIndex != -1) {
        const category: MenuCategory = categories[categoryIndex];
        const isServeAvailable: boolean = checkIsServiceAvailable({
          category,
          currentDateTime,
        });
        if (!isServeAvailable) {
          throw Error(
            "${menu.menuName} は現在提供時間外のため、一度カートから削除をして再度オーダーして下さい"
          );
        }
      }
    }

    /// 個数制限しているメニューの数をチェック
    for (const latestOrderCart of latestOrderCarts) {
      const menuId: string | null = latestOrderCart.menuId;
      if (menuId == null) {
        continue;
      }

      /// 被ってるメニューIdがある場合は増える
      const count: number = (menuCountMap as any)[menuId] ?? 0;

      /// カートに入れてるメニューver
      if (latestOrderCart.menuId == menuId) {
        menuCountMap = {
          ...menuCountMap,
          [`${menuId}`]: count + latestOrderCart.userIds.length,
        };
      }

      /// オプションメニューver
      for (const optionMenuIds of Object.values(latestOrderCart.options)) {
        for (const optionMenuId of optionMenuIds as any) {
          if (optionMenuId == menuId) {
            menuCountMap = {
              ...menuCountMap,
              [`${menuId}`]: count + latestOrderCart.userIds.length,
            };
          }
        }
      }

      /// ShopMenu を取得する
      const menuIndex: number = latestMenus.findIndex(
        (element) => element.menuId == menuId
      );
      if (menuIndex == -1) {
        continue;
      }
      const menu: ShopMenu = latestMenus[menuIndex];

      /// 個数制限をしてない場合はスルー
      if (!menu.isLimited) {
        continue;
      }

      /// 注文するメニューの数（オプション込み）
      const menuCountAmount: number = (menuCountMap as any)[menuId] ?? 0;

      /// メニューの残り数
      const remaining: number = menu.defaultMenuCount - menu.todayOrderedCount;

      /// 注文しようとしている数よりも残り数の方が少ない場合はエラーを返す
      if (remaining - menuCountAmount < 0) {
        throw Error(
          `${menu.menuName} が残り$remainingつしか無いようですので、数を調整して再度オーダーして下さい`
        );
      }
    }

    /// ここから入力処理
    for (const orderCart of latestOrderCarts) {
      const orderCartDocRef = doc(
        db,
        orderCartsCollection,
        orderCart.orderCartId
      );

      t.update(orderCartDocRef, {
        orderId: orderHistory.orderId,
        orderAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    /// 限定商品の場合は todayOrderedCount を増やす
    for (const menu of latestMenus) {
      if (!menu.isLimited) {
        continue;
      }

      /// 増加数
      const incrementMenuCount: number =
        (menuCountMap as any)[menu.menuId] ?? 0;

      /// 本日売り切れかのチェック
      const todaySoldOut: boolean =
        menu.todayOrderedCount + incrementMenuCount == menu.defaultMenuCount;

      const menuDocRef = doc(
        db,
        shopsCollection,
        latestOrderRoom.shopId,
        menusCollection,
        menu.menuId
      );
      t.update(menuDocRef, {
        todayOrderedCount: increment(incrementMenuCount),
        updatedAt: serverTimestamp(),
        soldOutType: todaySoldOut ? "today" : "onSale",
      });
    }

    /// OrderHistory 追加
    const orderHistoryDocRef = doc(
      db,
      orderRoomsCollection,
      orderRoom.orderRoomId,
      orderHistoriesCollection,
      orderHistory.orderId
    );
    t.set(orderHistoryDocRef, orderHistory);
  });
}
