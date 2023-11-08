import React from "react";
import { CheckoutState } from "../state";
import { useCurrentUser } from "@/hooks/current_user";
import { cancelOrderPayment, sendCheck } from "@/repositories/order_payment";
import { OrderPayment } from "@/domain/order_payment";
import { useCheckoutHooks } from "../fetcher";
import { KeyedMutator } from "swr";
import { useRouter } from "next/navigation";
import { OrderRoom } from "@/domain/order_room";
import { getOrderRoomById } from "@/repositories/order_room";

interface CheckoutBottomButtonProps {
  data: CheckoutState;
  mutate: KeyedMutator<CheckoutState>;
}

export default function CheckoutBottomButton({
  data,
  mutate,
}: CheckoutBottomButtonProps) {
  const { currentUser } = useCurrentUser();
  const { paymentMap } = useCheckoutHooks({ data, mutate });
  const router = useRouter();

  if (data.orderRoom.hostId != currentUser?.userId) {
    return <div></div>;
  }

  const latestOrderPayment: OrderPayment | null =
    data.orderRoom.orderPaymentId == null
      ? null
      : (paymentMap as any)[data.orderRoom.orderPaymentId];

  const isHavingOrderPayment: boolean = latestOrderPayment != null;

  async function handleSendCheck() {
    const confirmMessage = "お会計を作成しますか？";
    if (confirm(confirmMessage)) {
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
        .then(async (value) => {
          alert("ユーザー全員にお会計を送信しました");
          mutate();

          // 画面遷移
          await getOrderRoomById(data.orderRoom.orderRoomId).then((value) => {
            if (value.orderPaymentId != null) {
              router.push(
                `/order-rooms/${data.orderRoom.orderRoomId}/order-payment/${value.orderPaymentId}`
              );
            }
          });
        })
        .catch((e) => alert(e));
    }
  }

  function handleCancelOrderPayment() {
    if (latestOrderPayment != null) {
      const message = "お会計をキャンセルしても宜しいですか？";
      if (confirm(message)) {
        cancelOrderPayment({
          orderRoomId: data.orderRoom.orderRoomId,
          orderPayment: latestOrderPayment,
        }).then((value) => {
          alert("お会計をキャンセルしました");
          mutate();
        });
      }
    }
  }

  return (
    <div className="fixed bottom-0 py-3 px-4 w-full">
      <button
        className={`w-full py-3 rounded-lg font-bold text-white ${
          isHavingOrderPayment ? "bg-black" : "bg-orange-400"
        }`}
        onClick={
          isHavingOrderPayment ? handleCancelOrderPayment : handleSendCheck
        }
      >
        {isHavingOrderPayment ? "お会計をキャンセルする" : "お会計を作成する"}
      </button>
    </div>
  );
}
