import { doc_not_found } from "@/constants/error";
import {
  desc,
  kOrderRoomId,
  orderCartsCollection,
  orderRoomsCollection,
} from "@/constants/firebase";
import { updatedAt, isActive, isDeleted } from "@/constants/keys";
import { OrderCart, orderCartFromJson } from "@/domain/order_cart";
import { OrderRoom, orderRoomFromJson } from "@/domain/order_room";
import { Shop } from "@/domain/shop";
import { ShopMenu } from "@/domain/shop_menu";
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

export const getOrderCartsContainedUnLimitedPlanById: (
  orderRoomId: string
) => Promise<OrderCart[]> = async (orderRoomId: string) => {
  const q = query(
    collectionRef(),
    where(isActive, "==", true),
    where("unLimitedPlanStartAt", "!=", null),
    where(kOrderRoomId, "==", orderRoomId)
  );

  return await getDocs(q).then((value) =>
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
  const orderCart = createOrderCart({
    orderCartId: uuidv4(),
    orderRoomId: orderRoom.orderRoomId,
    shop,
    userIds: userIds as any,
    options,
    menuId,
    currentUser,
    orderedMenuAmount,
  });

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
