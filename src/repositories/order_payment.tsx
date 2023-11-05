import { doc_not_found } from "@/constants/error";
import {
  coverChargeCollection,
  kOrderRoomId,
  orderCartsCollection,
  orderPaymentsCollection,
  orderRoomsCollection,
  payersCollection,
  shopsCollection,
} from "@/constants/firebase";
import { kCash, kRequest } from "@/constants/keys";
import { OrderPayment, orderPaymentFromJson } from "@/domain/order_payment";
import { Payer, payerFromJson } from "@/domain/payer";
import { auth, db } from "@/providers/firebase";
import {
  calcCheckoutAmount,
  calcCheckoutAmountPerPerson,
} from "@/services/calc/checkout";
import { calcOrdersAmount } from "@/services/calc/order_cart";
import {
  collection,
  doc,
  getDoc,
  getDocFromServer,
  getDocs,
  getDocsFromServer,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { getCurrentDateTime } from "./server_timestamp";
import { OrderCart, orderCartFromJson } from "@/domain/order_cart";
import { OrderRoom, orderRoomFromJson } from "@/domain/order_room";
import { ShopMenu } from "@/domain/shop_menu";
import { calcAppetizerAmount } from "@/services/calc/appetizer";
import { Shop, shopFromJson } from "@/domain/shop";
import { calcCoverChargeAmount } from "@/services/calc/cover_charge";
import { CoverCharge, coverChargeFromJson } from "@/domain/cover_charge";
import { OrderRoomUser } from "@/domain/order_room_user";
import { createPayer } from "@/services/create/payer";
import { createOrderPayment } from "@/services/create/order_payments";
import { v4 as uuidv4 } from "uuid";
import { AppUser } from "@/domain/user";

const collectionRef = () => collection(db, orderPaymentsCollection);
const docRef = (orderPaymentId: string) =>
  doc(db, orderPaymentsCollection, orderPaymentId);

export const getOrderPaymentById: (
  orderPaymentId: string
) => Promise<OrderPayment> = async (orderPaymentId: string) => {
  const orderPaymentDocRef = doc(db, "order_payments", orderPaymentId);
  return await getDoc(orderPaymentDocRef).then((value) => {
    if (value.data() == undefined) {
      throw doc_not_found;
    }
    return orderPaymentFromJson(value.data()!);
  });
};

export const makePayment = async (orderPaymentId: string) => {
  await runTransaction(db, async (t) => {
    //todo 最新の payment を取得
    const orderPaymentDocRef = doc(db, "order_payments", orderPaymentId);
    await t.get(orderPaymentDocRef).then((value) => {
      if (value.data() == null) {
        throw "お会計データが見つかりませんでした";
      }
      const orderPayment = value.data() as OrderPayment;
      if (orderPayment.status == "cancel") {
        throw "既にキャンセルされたお会計のため更新できませんでした";
      } else if (orderPayment.status == "completed") {
        throw "既に完了しているお会計のため更新できませんでした";
      }
    });

    const uid = auth.currentUser?.uid;
    if (uid == null) {
      throw "ユーザー情報を取得できませんでした";
    }

    // 最新の payer を取得（リクエスト or キャンセルならストップ
    const payerDocRef = doc(
      db,
      "order_payments",
      orderPaymentId,
      "payers",
      uid
    );
    await t.get(payerDocRef).then((value) => {
      if (value.data() == null) {
        throw "あなた専用のお会計が取得できませんでした";
      }
      const payer = value.data() as Payer;
      if (payer.status != "request") {
        throw "既にデータが変わっているため変更できませんでした";
      }
    });

    t.update(payerDocRef, {
      updatedAt: serverTimestamp(),
      status: "cash",
    });
  });
};

export const updateStatusToCash = async (
  orderPayment: OrderPayment,
  payers: Payer[]
) => {
  await runTransaction(db, async (t) => {
    const orderPaymentDocRef = docRef(orderPayment.orderPaymentId);

    /// 最新の OrderPayment を取得
    const latestOrderPayment: OrderPayment = await t
      .get(orderPaymentDocRef)
      .then((value) => {
        if (value.data() == undefined) {
          throw doc_not_found;
        }
        return orderPaymentFromJson(value.data()!);
      });

    if (latestOrderPayment.status != kRequest) {
      throw "お会計のステータスが変更されているため処理を中止しました";
    }

    let latestPayers: Payer[] = [];

    for (let payer of payers) {
      const payerDocRef = doc(
        db,
        orderPaymentsCollection,
        orderPayment.orderPaymentId,
        payersCollection,
        payer.payerId
      );

      const latestPayer: Payer = await t.get(payerDocRef).then((value) => {
        if (value.data() == null) {
          throw doc_not_found;
        }
        return payerFromJson(value.data()!);
      });

      if (latestPayer.status == kRequest) {
        latestPayers = [...latestPayers, latestPayer];
      }
    }

    for (let latestPayer of latestPayers) {
      const latestPayerDocRef = doc(
        db,
        orderPaymentsCollection,
        orderPayment.orderPaymentId,
        payersCollection,
        latestPayer.payerId
      );

      t.update(latestPayerDocRef, {
        updatedAt: serverTimestamp(),
        status: kCash,
      });
    }
  });
};

interface SendCheckProps {
  orderCarts: OrderCart[];
  unLimitedMenuOrderCarts: OrderCart[];
  menus: ShopMenu[];
  orderRoom: OrderRoom;
  shop: Shop;
  coverCharge: CoverCharge | null;
  orderRoomUsers: OrderRoomUser[];
  customAmount: {};
  checkoutType: string;
  currentUser: AppUser;
}

export async function sendCheck({
  orderCarts,
  unLimitedMenuOrderCarts,
  menus,
  orderRoom,
  shop,
  coverCharge,
  orderRoomUsers,
  customAmount,
  checkoutType,
  currentUser,
}: SendCheckProps) {
  const currentDateTime: Date = await getCurrentDateTime();

  const orderedAmount: number = calcOrdersAmount({
    orderCarts,
    unLimitedMenuOrderCarts,
    menus,
    orderRoom,
    isOrdered: true,
    currentDateTime,
  });

  const guestCount: number =
    orderRoom.womenCount + orderRoom.menCount + orderRoom.teenCount;

  const appetizerAmount: number = calcAppetizerAmount({
    guestCount,
    shop,
  });

  const coverChargeAmount: number = calcCoverChargeAmount({
    coverCharge,
    orderedAmount,
    guestCount,
    shop,
    withTax: true,
  });

  const checkoutAmount: number = calcCheckoutAmount({
    orderedAmount,
    appetizerAmount,
    coverChargeAmount,
    orderRoom,
  });

  if (checkoutAmount < 0) {
    throw Error(
      "お会計の合計金額が¥0を下回っているため" +
        "\n送信できませんでした。" +
        "\nお近くのスタッフをお呼び下さい"
    );
  }

  const activeOrderRoomUserCount = orderRoomUsers.filter(
    (user) => user.isActive
  ).length;

  /// Payers を作成
  let payers: Payer[] = [];
  for (const orderRoomUser of orderRoomUsers) {
    if (!orderRoomUser.isActive) {
      continue;
    }

    /// type 別に合計金額を計算（1人分）
    const amountPerPerson: number = calcCheckoutAmountPerPerson({
      amount: checkoutAmount,
      userId: orderRoomUser.userId,
      isHost: orderRoom.hostId == orderRoomUser.userId,
      userCount: activeOrderRoomUserCount,
      customAmount: customAmount,
      checkoutType: checkoutType,
    });

    const status: string = amountPerPerson == 0 ? "cash" : "request";

    const payer: Payer = createPayer({
      payerId: orderRoomUser.userId,
      payerIcon: orderRoomUser.userIcon,
      payerName: orderRoomUser.userName,
      status: status,
      amount: amountPerPerson,
    });

    payers = [...payers, payer];
  }

  /// customの場合は合計金額を確認する
  /// 一致しない場合はエラーを出す
  if (checkoutType == "custom") {
    const customAmount: number = payers.reduce(
      (sum, element) => sum + element.amount,
      0
    );
    if (customAmount != checkoutAmount) {
      throw Error(
        "カスタムの合計金額が一致しません\n再度ご確認の上、もう一度実行して下さい"
      );
    }
  }

  const orderPayment: OrderPayment = createOrderPayment({
    orderPaymentId: uuidv4(),
    shopId: shop.shopId,
    userId: currentUser.userId,
    orderRoomId: orderRoom.orderRoomId,
    amount: checkoutAmount,
    appetizerAmount,
    coverChargeAmount,
    orderAmount: orderedAmount,
  });

  await runTransaction(db, async (t) => {
    const orderRoomDocRef = doc(
      db,
      orderRoomsCollection,
      orderRoom.orderRoomId
    );
    const latestOrderRoom: OrderRoom = await t
      .get(orderRoomDocRef)
      .then((value) => orderRoomFromJson(value.data()!));

    if (latestOrderRoom.isClosed) {
      throw Error("既に終了したルームのため処理を実行できませんでした");
    } else if (latestOrderRoom.userIds.length != activeOrderRoomUserCount) {
      throw Error(
        "ルームに参加している人数が異なるため一度リロードしてください"
      );
    }

    /// 最新の決済情報を取得して状況をチェックする
    if (latestOrderRoom.orderPaymentId != null) {
      const orderPaymentDocRef = doc(
        db,
        orderPaymentsCollection,
        latestOrderRoom.orderPaymentId
      );

      const latestOrderPayment = await t
        .get(orderPaymentDocRef)
        .then((value) => orderPaymentFromJson(value.data()!));

      if (latestOrderPayment.status == "completed") {
        throw Error(
          "既に完了したお会計があるため、まずはそちらをキャンセルしてから再度送信し直して下さい"
        );
      } else if (latestOrderPayment.status == "request") {
        throw Error(
          "現在、進行中のお会計があるようなのでお会計作成処理をストップしました"
        );
      }
    }

    /// テーブルチャージを取得する
    let latestCoverCharge: CoverCharge | null = null;
    if (latestOrderRoom.coverChargeId != null) {
      const coverChargeDocRef = doc(
        db,
        shopsCollection,
        shop.shopId,
        coverChargeCollection,
        latestOrderRoom.coverChargeId
      );

      latestCoverCharge = await t
        .get(coverChargeDocRef)
        .then((value) => coverChargeFromJson(value.data()!));
    }

    /// 注文済みのカートを全て取得する
    const q = query(
      collection(db, orderCartsCollection),
      where("orderRoomId", "==", latestOrderRoom.orderRoomId),
      where("orderId", "!=", null),
      where("isDeleted", "==", false)
    );
    const latestOrderCarts: OrderCart[] = await getDocs(q).then((value) =>
      value.docs.map((e) => orderCartFromJson(e.data()))
    );

    const latestUnLimitedMenuOrderCarts = latestOrderCarts.filter(
      (orderCart) => orderCart.unLimitedPlanStartAt != null
    );

    /// 最新のメニュー合計金額
    const latestOrderedAmount = calcOrdersAmount({
      orderCarts: latestOrderCarts,
      unLimitedMenuOrderCarts: latestUnLimitedMenuOrderCarts,
      menus,
      orderRoom: latestOrderRoom,
      isOrdered: true,
      currentDateTime,
    });

    const latestGuestCount: number =
      latestOrderRoom.womenCount +
      latestOrderRoom.menCount +
      latestOrderRoom.teenCount;

    const latestAppetizerAmount: number = calcAppetizerAmount({
      guestCount: latestGuestCount,
      shop,
    });

    const latestCoverChargeAmount: number = calcCoverChargeAmount({
      coverCharge: latestCoverCharge,
      orderedAmount,
      guestCount,
      shop,
      withTax: true,
    });

    const latestCheckoutAmount: number = calcCheckoutAmount({
      orderedAmount: latestOrderedAmount,
      appetizerAmount: latestAppetizerAmount,
      coverChargeAmount: latestCoverChargeAmount,
      orderRoom: latestOrderRoom,
    });

    if (latestCheckoutAmount != orderPayment.amount) {
      console.log("failed amount: " + latestCheckoutAmount);
      throw Error(
        "合計金額が一致しませんでした\n5秒ほど時間を置いて再度実行してみて下さい"
      );
    }

    /// order payment 作成
    const latestOrderPaymentDocRef = doc(
      db,
      orderPaymentsCollection,
      orderPayment.orderPaymentId
    );

    t.set(latestOrderPaymentDocRef, orderPayment);

    /// payer 作成
    for (const payer of payers) {
      const payerDocRef = doc(
        db,
        orderPaymentsCollection,
        orderPayment.orderPaymentId,
        payersCollection,
        payer.payerId
      );
      t.set(payerDocRef, payer);
    }

    /// order room 更新
    t.update(orderRoomDocRef, {
      updatedAt: serverTimestamp(),
      onOrder: false,
      orderPaymentId: orderPayment.orderPaymentId,
    });
  });
}

interface CancelOrderPaymentProps {
  orderRoomId: string;
  orderPayment: OrderPayment;
}

export async function cancelOrderPayment({
  orderRoomId,
  orderPayment,
}: CancelOrderPaymentProps) {
  await runTransaction(db, async (t) => {
    const orderRoomDocRef = doc(db, orderRoomsCollection, orderRoomId);

    const latestOrderRoom: OrderRoom = await t
      .get(orderRoomDocRef)
      .then((value) => orderRoomFromJson(value.data()!));

    if (latestOrderRoom.isClosed) {
      throw Error(
        "既に終了したルームのためキャンセルできませんでした\n返金をご希望の場合はお店の方にお伝えください"
      );
    } else if (
      latestOrderRoom.orderPaymentId == null ||
      latestOrderRoom.orderPaymentId != orderPayment.orderPaymentId
    ) {
      throw Error("お会計情報に間違いがあるため処理を実行できませんでした");
    }

    const orderPaymentDocRef = doc(
      db,
      orderPaymentsCollection,
      latestOrderRoom.orderPaymentId
    );

    const latestOrderPayment: OrderPayment = await t
      .get(orderPaymentDocRef)
      .then((value) => orderPaymentFromJson(value.data()!));

    if (latestOrderPayment.status != orderPayment.status) {
      throw Error("ステータスが変更したため処理を中止しました");
    }

    t.update(orderPaymentDocRef, {
      updatedAt: serverTimestamp(),
      status: "cancel",
    });

    t.update(orderRoomDocRef, {
      orderPaymentId: null,
      onOrder: true,
      updatedAt: serverTimestamp(),
    });
  });
}

export function streamOrderPaymentsById(
  orderRoomId: string,
  onNext: (value: OrderPayment[]) => void
) {
  const q = query(
    collection(db, orderPaymentsCollection),
    where("orderRoomId", "==", orderRoomId)
  );

  return onSnapshot(q, (value) => {
    const orderPayments = value.docs.map((e) => orderPaymentFromJson(e.data()));
    return onNext(orderPayments);
  });
}

export async function getLocalOrderPaymentsById(
  orderRoomId: string
): Promise<OrderPayment[]> {
  const q = query(
    collection(db, orderPaymentsCollection),
    where(kOrderRoomId, "==", orderRoomId)
  );

  return await getDocsFromServer(q).then((value) =>
    value.docs.map((e) => orderPaymentFromJson(e.data()))
  );
}
