import Image from "next/image";
import { ReactNode } from "react";
import { OrderChat } from "@/domain/order_chat";

type LayoutProps = {
  children: ReactNode;
  orderChat: OrderChat;
};

export default function PrimaryChatSenderInfo({
  children,
  orderChat,
}: LayoutProps) {
  const createdAt: Date = orderChat.createdAt ?? new Date();
  const month = createdAt.getMonth();
  const day = createdAt.getDate();
  const hour = createdAt.getHours();
  const minutes = createdAt.getMinutes();

  return (
    <div className="mb-4 flex px-4">
      <div
        className="h-8 w-8"
        style={{ position: "relative", height: "32px", width: "32px" }}
      >
        <Image
          className="rounded-full"
          src={orderChat.senderIcon}
          alt="order-chat-icon"
          fill
          priority
        ></Image>
      </div>
      <div className="grow ml-2">
        <div className="flex mb-1">
          <h1 className="text-xs mr-2">{orderChat.senderName}</h1>
          {orderChat.senderPosition != null && (
            <h2 className="text-xs mr-2 text-gray-400">
              {orderChat.senderPosition}
            </h2>
          )}
          <h2 className="text-xs text-gray-400">
            {month}月{day}日 {hour}:{minutes}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
}
