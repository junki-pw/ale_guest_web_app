import React from "react";
import { OrderCartState } from "../state";
import { calcOrdersAmount } from "@/services/calc/order_cart";

interface OrderCartBottomProps {
  data: OrderCartState;
}

export default function OrderCartBottom({ data }: OrderCartBottomProps) {
  const orderCartAmount: number = calcOrdersAmount({
    orderCarts: data.orderCarts,
    unLimitedMenuOrderCarts: data.unLimitedMenuOrderCarts,
    menus: data.menus,
    orderRoom: data.orderRoom,
    isOrdered: false,
    currentDateTime: data.currentDateTime,
  });

  const handleSendOrder = () => {};

  return (
    <div className="fixed bottom-0 flex w-full p-4 bg-white">
      <div className="block">
        <h1 className="font-bold text-xs text-gray-400">合計金額</h1>
        <h2 className="mt-1 font-bold text-2xl">
          ¥{orderCartAmount.toLocaleString()}
        </h2>
      </div>
      <div className="w-6"></div>
      <button
        className="grow bg-orange-400 text-white font-bold text-center rounded-md"
        onClick={handleSendOrder}
      >
        注文を送信する
      </button>
    </div>
  );
}
