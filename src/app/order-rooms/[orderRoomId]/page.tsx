"use client";
import OrderChatJoinTile from "./components/order_chat_join_tile";
import { OrderChat } from "@/domain/order_chat";
import OrderChatFirstMessage from "./components/message_type/order_chat_first_message";
import OrderChatTextMessage from "./components/order_chat_text_message";
import OrderChatCheckoutMessage from "./components/order_chat_checkout_message";
import OrderChatOrderPaymentMessage from "./components/order_chat_order_payment_message";
import { v4 as uuidv4 } from "uuid";
import useSWR, { KeyedMutator } from "swr";
import { orderRoomFetcher } from "./fetcher";
import { OrderRoomState } from "./state";
import CheckJoinPage from "./check-join/page";
import { order_room_closed, user_not_joined } from "@/constants/error";
import OrderRoomBottom from "./components/order_room_bottom";
import { scrollBottom, useOrderRoomHooks } from "./hooks";
import { useEffect } from "react";

interface OrderRoomPageProps {
  params: {
    orderRoomId: string;
  };
}

export default function OrderRoomPage(props: OrderRoomPageProps) {
  const orderRoomId = props.params.orderRoomId;
  const { data, error, isLoading, mutate } = useSWR<OrderRoomState>(
    `order-rooms/${orderRoomId}`,
    () => orderRoomFetcher(orderRoomId)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error || data == undefined) {
    switch (error) {
      case order_room_closed:
        return <div>既に終了しているルームのため表示できませんでした</div>;
      case user_not_joined:
        return (
          <CheckJoinPage
            params={{
              orderRoomId: orderRoomId,
            }}
          />
        );
      default:
        return <div>Wifi環境をご確認の上、もう一度リロードしてみて下さい</div>;
    }
  }

  return <Body data={data} mutate={mutate} />;
}

interface BodyProps {
  data: OrderRoomState;
  mutate: KeyedMutator<OrderRoomState>;
}

function Body({ data, mutate }: BodyProps) {
  // 監視処理
  const { orderChats, orderPaymentData } = useOrderRoomHooks(
    data.orderRoom.orderRoomId
  );

  useEffect(() => {
    mutate({ ...data, ...orderPaymentData, orderChats }, false);
    scrollBottom();
  }, [orderPaymentData, orderChats]);

  return (
    <main className="relative h-full mt-6">
      <div className="grow flex flex-col-reverse">
        {orderChats.map((orderChat) => (
          <ChatTiles key={uuidv4()} orderChat={orderChat} data={data} />
        ))}
      </div>
      <div className="h-[87.5px]"></div>
      <OrderRoomBottom data={data} />
    </main>
  );
}

export interface OrderChatProps {
  orderChat: OrderChat;
  data: OrderRoomState;
}

const ChatTiles = ({ orderChat, data }: OrderChatProps) => {
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
          data={data}
        />
      );
    case "orderPayment":
      return (
        <OrderChatOrderPaymentMessage
          key={orderChat.orderChatId}
          orderChat={orderChat}
          data={data}
        />
      );
    case "checkout":
      return (
        <OrderChatCheckoutMessage
          key={orderChat.orderChatId}
          orderChat={orderChat}
          data={data}
        />
      );
  }
};
