import { doc_not_found } from "@/constants/error";
import { orderPaymentsCollection } from "@/constants/firebase";
import { OrderPayment, orderPaymentFromJson } from "@/domain/order_payment";
import { Payer } from "@/domain/payer";
import { auth, db } from "@/providers/firebase";
import {
  collection,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

const collectionRef = () => collection(db, orderPaymentsCollection);

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
