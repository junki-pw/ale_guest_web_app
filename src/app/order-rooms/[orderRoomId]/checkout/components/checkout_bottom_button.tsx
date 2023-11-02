import React from "react";
import { CheckoutState } from "../state";
import { useCurrentUser } from "@/hooks/current_user";
import { sendCheck } from "@/repositories/order_payment";

interface CheckoutBottomButtonProps {
  data: CheckoutState;
}

export default function CheckoutBottomButton({
  data,
}: CheckoutBottomButtonProps) {
  const { currentUser } = useCurrentUser();
  if (data.orderRoom.hostId != currentUser?.userId) {
    return <div></div>;
  }

  async function handleSendCheck() {
    await sendCheck({
      orderCarts: data.orderCarts,
      unLimitedMenuOrderCarts: data.orderCartsContainUnLimitedMenu,
      menus: data.menus,
      orderRoom: data.orderRoom,
      shop: data.shop,
      coverCharge: data.coverCharge,
      orderRoomUsers: data.orderRoomUsers,
      customAmount: data.customAmount,
      checkoutType: data.checkoutType,
      currentUser: currentUser!,
    })
      .then((value) => alert("ユーザー全員にお会計を送信しました"))
      .catch((e) => alert(e));
  }

  return (
    <div className="fixed bottom-3 px-4 w-full">
      <button
        className="w-full bg-orange-400 py-3 rounded-lg font-bold text-white"
        onClick={handleSendCheck}
      >
        お会計を作成する
      </button>
    </div>
  );
}
