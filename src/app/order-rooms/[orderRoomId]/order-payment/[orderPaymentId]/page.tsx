"use client";

import { Payer } from "@/domain/payer";
import { auth, db } from "@/providers/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import BottomMakeButton from "./components/bottom_make_button";
import useSWR from "swr";
import { orderPaymentFetcher } from "./fetcher";

interface OrderPaymentArgs {
  params: {
    orderPaymentId: string;
  };
}

export default function OrderPaymentPage({
  params: { orderPaymentId },
}: OrderPaymentArgs) {
  const { data, isLoading, error } = useSWR(
    `order-payments/${orderPaymentId}`,
    () => orderPaymentFetcher(orderPaymentId)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error が発生しました</div>;
  }

  return (
    <main className="relative h-full py-6 px-4">
      {/* // 合計金額 */}
      <h1 className="text-lg font-bold ">合計金額</h1>
      <h2 className="my-1.5 text-3xl text-orange-500 font-bold">
        ¥ {data!.payer?.amount}
      </h2>
      <div className="h-[1px] w-full bg-gray-300"></div>

      {/* // お支払い方法 */}
      <h1 className="text-lg font-bold mt-8 mb-3">お支払い方法</h1>
      <div className="flex">
        <_Button isCardPayment={true} />
        <_Button isCardPayment={false} />
      </div>
      <p className="text-xs text-gray-400 mt-4">
        大変申し訳ありませんがWEB版ではカード支払いが出来ません。
        <br />
        次回以降のアップデートで出来るように努めます。
        <br />
        <br />
        また、アプリ上でのカード決済ではあなたがお会計をすると
        <br />
        スタッフの詳細を見れたり評価をしたり出来ます。
      </p>

      <BottomMakeButton orderPaymentId={orderPaymentId} />
    </main>
  );
}

interface ButtonProps {
  isCardPayment: Boolean;
}

const _Button = ({ isCardPayment }: ButtonProps) => {
  return (
    <button
      className={`
            grow py-2.5 rounded-md text-[14px]
            ${isCardPayment ? "bg-white" : "bg-orange-400"}
            ${isCardPayment ? "font-normal" : "font-bold"}
            ${isCardPayment ? "text-gray-400" : "text-white"}
            border
            ${isCardPayment ? "mr-3" : ""}
       `}
    >
      {isCardPayment ? "カードで支払う" : "現金で支払う"}
    </button>
  );
};
