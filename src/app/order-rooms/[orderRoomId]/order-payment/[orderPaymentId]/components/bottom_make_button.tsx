import { OrderPayment } from "@/domain/order_payment";
import { Payer } from "@/domain/payer";
import { db } from "@/providers/firebase";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import React from "react";

interface Props {
  orderPaymentId: string;
}

export default function BottomMakeButton({ orderPaymentId }: Props) {
  // お支払いを確定
  async function handleMakePayment() {
    if (
      window.confirm(
        "お支払いを確定しても宜しいですか？\n後から変更したい場合はキャンセルできます。"
      )
    ) {
      console.log("yes");
      //todo

      await runTransaction(db, async (t) => {
        //todo 最新の payment を取得
        const orderPaymentDocRef = doc(db, "order_payments", orderPaymentId);
        await t.get(orderPaymentDocRef).then((value) => {
          if (value.data() == null) {
            alert("お会計データが見つかりませんでした");
            return;
          }
          const orderPayment = value.data() as OrderPayment;
          if (orderPayment.status == "cancel") {
            alert("既にキャンセルされたお会計のため更新できませんでした");
            return;
          } else if (orderPayment.status == "completed") {
            alert("既に完了しているお会計のため更新できませんでした");
            return;
          }
        });

        const uid = "4Vz8TRP05PX1l9NWUbsjrwsiFcI2";
        // auth.currentUser?.uid
        if (uid == null) {
          alert("ユーザー情報を取得できませんでした");
          return;
        }
        //todo 最新の payer を取得（リクエスト or キャンセルならストップ
        const payerDocRef = doc(
          db,
          "order_payments",
          orderPaymentId,
          "payers",
          uid
        );
        await t.get(payerDocRef).then((value) => {
          if (value.data() == null) {
            alert("あなた専用のお会計が取得できませんでした");
          }
          const payer = value.data() as Payer;
          if (payer.status != "request") {
            alert("既にデータが変わっているため変更できませんでした");
            return;
          }
        });

        t.update(payerDocRef, {
          updatedAt: serverTimestamp(),
          status: "cash",
        });
      });
    } else {
      console.log("no");
    }
  }

  return (
    <button
      className="fixed bottom-3 px-4 w-full py-3 bg-orange-400 rounded-md font-bold text-white"
      onClick={handleMakePayment}
    >
      お支払いを確定する
    </button>
  );
}
