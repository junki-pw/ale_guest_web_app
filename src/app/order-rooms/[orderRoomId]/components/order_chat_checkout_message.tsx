import React from "react";
import PrimaryChatSenderInfo from "./message_type/sub/primary_chat_sender_info";
import PrimaryChatText from "./message_type/sub/primary_chat_text";
import { useRouter } from "next/navigation";
import { OrderPaymentMessageProps } from "./order_chat_order_payment_message";

export default function OrderChatCheckoutMessage({
  orderChat,
  orderRoomId,
  orderPaymentId,
}: OrderPaymentMessageProps) {
  const router = useRouter();
  const handleGoToPaymentStatusPage = () => {
    router.push(
      `/order-rooms/${orderRoomId}/order-payment/${orderPaymentId}/status`
    );
  };

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
          <button className="bg-orange-500 px-4 py-3 rounded-lg w-min">
            <div className="text-white">
              <h2 className="mb-1">現金でのお支払い</h2>
              <div className="flex items-end">
                <h1 className="text-5xl font-bold">0</h1>
                <p className="text-2xl">円</p>
              </div>
            </div>
          </button>
          <div className="h-1"></div>
          <button
            className="p-3 bg-orange-500 rounded-lg text-white text-xs"
            onClick={handleGoToPaymentStatusPage}
          >
            各ユーザーのお会計情報はこちら
          </button>
        </div>
      </div>
    </PrimaryChatSenderInfo>
  );
}
