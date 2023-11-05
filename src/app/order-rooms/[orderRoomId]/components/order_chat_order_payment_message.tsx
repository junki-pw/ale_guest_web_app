import { OrderChat } from "@/domain/order_chat";
import PrimaryChatSenderInfo from "./message_type/sub/primary_chat_sender_info";
import { useRouter } from "next/navigation";
import { OrderRoomState } from "../state";
import { Payer } from "@/domain/payer";

export interface OrderPaymentMessageProps {
  orderChat: OrderChat;
  data: OrderRoomState;
}

export default function OrderChatOrderPaymentMessage({
  orderChat,
  data,
}: OrderPaymentMessageProps) {
  const router = useRouter();
  const payer: Payer | null =
    orderChat.orderPaymentId == null
      ? null
      : (data.payerMap as any)[orderChat.orderPaymentId];

  if (payer == null) {
    return <div className="p-1">データを読み取り中...</div>;
  }

  const handleGoToPaymentStatusPage = () => {
    router.push(
      `/order-rooms/${data.orderRoom.orderRoomId}/order-payment/${orderChat.orderPaymentId}/status`
    );
  };

  function handleGoToOrderPaymentDetailsPage() {
    const path: string = `/order-rooms/${data.orderRoom.orderRoomId}/order-payment/${orderChat.orderPaymentId}`;
    router.push(path);
  }

  return (
    <PrimaryChatSenderInfo orderChat={orderChat}>
      <div className="flex flex-col items-start">
        <button
          className="bg-orange-500 px-4 py-3 rounded-lg w-min"
          onClick={handleGoToOrderPaymentDetailsPage}
        >
          <div className="text-white">
            <h2 className="mb-1">あなたのお支払い金額</h2>
            <div className="flex items-end">
              <h1 className="text-5xl font-bold">{payer.amount}</h1>
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
