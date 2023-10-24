import { OrderChat } from "@/domain/order_chat";
import { OrderChatProps } from "../page";
import PrimaryChatSenderInfo from "./message_type/sub/primary_chat_sender_info";
import { useRouter } from "next/navigation";

export interface OrderPaymentMessageProps {
  orderChat: OrderChat;
  orderRoomId: string;
  orderPaymentId: string;
}

export default function OrderChatOrderPaymentMessage({
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
      <div className="flex flex-col items-start">
        <button className="bg-orange-500 px-4 py-3 rounded-lg w-min">
          <div className="text-white">
            <h2 className="mb-1">あなたのお支払い金額</h2>
            <div className="flex items-end">
              <h1 className="text-5xl font-bold">3,000</h1>
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
    </PrimaryChatSenderInfo>
  );
}
