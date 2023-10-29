"use client";
import React from "react";
import OrderCartTile from "./components/order_cart_tile";

export default function OrderHistoriesPage() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="relative flex flex-col mb-[120px]">
      {list.map((e) => (
        <OrderCartTile key={e} />
      ))}

      <div className="fixed bottom-0 flex w-full p-4 bg-white">
        <div className="block">
          <h1 className="font-bold text-xs text-gray-400">合計金額</h1>
          <h2 className="mt-1 font-bold text-2xl">¥1,890</h2>
        </div>
        <div className="w-6"></div>
        <button
          className="grow bg-orange-400 text-white font-bold text-center rounded-md"
          onClick={() => {}}
        >
          注文を送信する
        </button>
      </div>
    </div>
  );
}
