import { OrderPayment } from "@/domain/order_payment";
import { Payer } from "@/domain/payer";
import { db } from "@/providers/firebase";
import { makePayment } from "@/repositories/order_payment";
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

      await makePayment(orderPaymentId).catch((e) => {
        alert(e);
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
