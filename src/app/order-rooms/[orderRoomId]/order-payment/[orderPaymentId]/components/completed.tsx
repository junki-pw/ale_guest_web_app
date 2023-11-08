import React from "react";
import Image from "next/image";
import checkImage from "../../../../../../../public/check-circle-outline.png";
import { OrderPaymentState } from "../state";
import { useRouter } from "next/navigation";

interface OrderPaymentCompletedViewProps {
  data: OrderPaymentState;
}

export default function OrderPaymentCompletedView({
  data,
}: OrderPaymentCompletedViewProps) {
  const router = useRouter();

  function handleClicked() {
    const path = `/order-rooms/${data.orderPayment.orderRoomId}/order-payment/${data.orderPayment.orderPaymentId}/status`;
    router.push(path);
  }

  return (
    <div className="py-6">
      <div className="flex justify-center">
        <Image
          src={checkImage}
          alt={"successfull image"}
          width={120}
          height={120}
        ></Image>
      </div>
      <h1 className="mt-6 mb-3 text-green-500 font-bold text-2xl text-center">
        お支払い完了
      </h1>
      <p className="mb-3 text-center text-xs text-gray-500">
        お支払いが完了しています。
        <br />
        他のユーザーのお支払い状況を確認したり
        <br />
        スタッフを評価・チップ送信したりしてみましょう！
      </p>
      <div className="flex justify-center">
        <button
          className="font-bold rounded-md py-3 px-6 bg-gray-50"
          onClick={handleClicked}
        >
          他ユーザーのお支払い状況を確認する
        </button>
      </div>
    </div>
  );
}
