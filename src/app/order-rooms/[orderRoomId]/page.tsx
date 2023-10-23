"use client";
import OrderChatJoinTile from "./components/order_chat_join_tile";
import { OrderChat } from "@/domain/order_chat";
import OrderChatFirstMessage from "./components/message_type/order_chat_first_message";
import OrderChatTextMessage from "./components/order_chat_text_message";
import OrderChatCheckoutMessage from "./components/order_chat_checkout_message";
import OrderChatOrderPaymentMessage from "./components/order_chat_order_payment_message";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import { orderRoomFetcher } from "./order_room_fetcher";
import { OrderRoomState } from "./state";
import CheckJoinPage from "./check-join/page";
import { order_room_closed, user_not_joined } from "@/constants/error";

interface OrderRoomPageProps {
  params: {
    orderRoomId: string;
  };
}

export default function OrderRoomPage({
  params: { orderRoomId },
}: OrderRoomPageProps) {
  const { data, error, isLoading } = useSWR<OrderRoomState>(
    "order_room/orderRoomId",
    () => orderRoomFetcher(orderRoomId)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    switch (error) {
      case order_room_closed:
        return <div>既に終了しているルームのため表示できませんでした</div>;
      case user_not_joined:
        return <CheckJoinPage />;
      default:
        return <div>Wifi環境をご確認の上、もう一度リロードしてみて下さい</div>;
    }
  }

  return (
    <main className="h-full">
      <div className="grow flex flex-col">
        {data!.orderChats.map((event) => (
          <ChatTiles key={uuidv4()} orderChat={event} />
        ))}
      </div>
    </main>
  );
}

export interface OrderChatProps {
  orderChat: OrderChat;
}

const ChatTiles = ({ orderChat }: OrderChatProps) => {
  if (orderChat.messageType == "join") {
    return (
      <OrderChatJoinTile key={orderChat.orderChatId} orderChat={orderChat} />
    );
  }

  switch (orderChat.messageType) {
    case "first":
      return (
        <OrderChatFirstMessage
          key={orderChat.orderChatId}
          orderChat={orderChat}
        />
      );
    case "text":
      return (
        <OrderChatTextMessage
          key={orderChat.orderChatId}
          orderChat={orderChat}
        />
      );
    case "orderPayment":
      return (
        <OrderChatOrderPaymentMessage
          key={orderChat.orderChatId}
          orderChat={orderChat}
          orderRoomId={""}
          orderPaymentId={""}
        />
      );
    case "checkout":
      return (
        <OrderChatCheckoutMessage
          key={orderChat.orderChatId}
          orderChat={orderChat}
          orderRoomId={""}
          orderPaymentId={""}
        />
      );
  }
};
