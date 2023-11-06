import React from "react";
import { OrderCartState } from "../state";
import { calcOrdersAmount } from "@/services/calc/order_cart";
import { confirmOrderCart } from "@/repositories/order_cart";
import { useCurrentUser } from "@/hooks/current_user";

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

  const { currentUser } = useCurrentUser();

  const handleConfirmOrder = async () => {
    const confirmMessage: string = "オーダーを送信しても宜しいですか？";
    if (confirm(confirmMessage)) {
      await confirmOrderCart({
        orderCarts: [...data.orderCarts].filter(
          (element) => element.orderId == null
        ),
        orderRoom: data.orderRoom,
        currentUser: currentUser!,
      })
        .then((value) => alert("メニューを送信しました"))
        .catch((e) => alert(e));
    }
  };

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
        onClick={handleConfirmOrder}
      >
        注文を送信する
      </button>
    </div>
  );
}
