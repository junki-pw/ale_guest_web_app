import React from "react";
import PrimaryChatSenderInfo from "./message_type/sub/primary_chat_sender_info";
import PrimaryChatText from "./message_type/sub/primary_chat_text";
import { useRouter } from "next/navigation";
import { OrderRoomState } from "../state";
import { OrderChat } from "@/domain/order_chat";
import { OrderPayment } from "@/domain/order_payment";
import { Payer } from "@/domain/payer";

interface OrderChatCheckoutMessageProps {
  orderChat: OrderChat;
  data: OrderRoomState;
}

export default function OrderChatCheckoutMessage({
  orderChat,
  data,
}: OrderChatCheckoutMessageProps) {
  const router = useRouter();

  const orderPayment: OrderPayment | null =
    orderChat.orderPaymentId == null
      ? null
      : (data.orderPaymentMap as any)[orderChat.orderPaymentId];

  const payers: Payer[] =
    orderPayment?.orderPaymentId == null
      ? []
      : (data.checkoutPayersMap as any)[orderPayment?.orderPaymentId] ?? [];

  if (orderPayment == null) {
    return <div>Loading...</div>;
  } else if (orderPayment.status == "cancel") {
    return <div>キャンセルされたお会計のため、表示できません</div>;
  }

  const handleGoToOrderPaymentPage = (goToStatus: boolean) => {
    router.push(
      `/order-rooms/${data.orderRoom.orderRoomId}/order-payment/${
        orderPayment.orderPaymentId
      }${goToStatus ? "/status" : ""}`
    );
  };

  const cashAmount: number = payers.reduce((prevoiusValue, payer) => {
    return (payer.status == "cash" ? payer.amount : 0) + prevoiusValue;
  }, 0);

  return (
    <PrimaryChatSenderInfo orderChat={orderChat}>
      <div>
        <PrimaryChatText
          message={
            "全員のお会計が完了しました。" +
            "現金でのお支払い金額は下記のとおりです。"
          }
        />
        <div className="h-1"></div>
        <div className="w-min-20 flex flex-col items-start">
          <button
            className="bg-orange-500 px-4 py-3 rounded-lg w-min"
            onClick={() => handleGoToOrderPaymentPage(false)}
          >
            <div className="text-white">
              <h2 className="mb-1">現金でのお支払い</h2>
              <div className="flex items-end">
                <h1 className="text-5xl font-bold">{cashAmount}</h1>
                <p className="text-2xl">円</p>
              </div>
            </div>
          </button>
          <div className="h-1"></div>
          <button
            className="p-3 bg-orange-500 rounded-lg text-white text-xs"
            onClick={() => handleGoToOrderPaymentPage(true)}
          >
            各ユーザーのお会計情報はこちら
          </button>
        </div>
      </div>
    </PrimaryChatSenderInfo>
  );
}
