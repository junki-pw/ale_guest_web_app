"use client";
import OrderChatJoinTile from "./components/order_chat_join_tile";
import { OrderChat } from "@/domain/order_chat";
import OrderChatFirstMessage from "./components/message_type/order_chat_first_message";
import OrderChatTextMessage from "./components/order_chat_text_message";
import OrderChatCheckoutMessage from "./components/order_chat_checkout_message";
import OrderChatOrderPaymentMessage from "./components/order_chat_order_payment_message";
import { v4 as uuidv4 } from "uuid";
import { orderRoomSelector } from "./test";
import React, { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { ErrorBoundary } from "react-error-boundary";

interface OrderRoomPageProps {
  params: {
    orderRoomId: string;
  };
}

export default function OrderRoomPage({
  params: { orderRoomId },
}: OrderRoomPageProps) {
  const data = useRecoilValue(orderRoomSelector(orderRoomId));

  return (
    <main className="h-full">
      <div className="grow flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary fallback={<div>Error...</div>}>
            {data.orderChats.map((event) => (
              <ChatTiles key={uuidv4()} orderChat={event} />
            ))}
          </ErrorBoundary>
        </Suspense>
      </div>
    </main>
  );
}

export interface OrderChatProps {
  orderChat: OrderChat;
}

function ChatTiles({ orderChat }: OrderChatProps) {
  if (orderChat.messageType == "join") {
    return <OrderChatJoinTile key={uuidv4()} />;
  }

  switch (orderChat.messageType) {
    case "first":
      return <OrderChatFirstMessage key={uuidv4()} />;
    case "text":
      return <OrderChatTextMessage key={uuidv4()} />;
    case "orderPayment":
      return <OrderChatOrderPaymentMessage key={uuidv4()} />;
    case "checkout":
      return <OrderChatCheckoutMessage key={uuidv4()} />;
  }
}
