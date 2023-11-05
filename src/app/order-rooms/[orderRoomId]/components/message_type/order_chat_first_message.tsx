"use client";

import { QRCodeCanvas } from "qrcode.react";
import PrimaryChatSenderInfo from "./sub/primary_chat_sender_info";
import PrimaryChatText from "./sub/primary_chat_text";
import copy from "clipboard-copy";
import { OrderChat } from "@/domain/order_chat";

interface OrderChatFirstMessageProps {
  orderChat: OrderChat;
}

export default function OrderChatFirstMessage({
  orderChat,
}: OrderChatFirstMessageProps) {
  const handleCopy = () => {
    copy("https://google.com/").then(() => {
      alert("リンクをコピーしました");
    });
  };

  return (
    <PrimaryChatSenderInfo orderChat={orderChat}>
      <div>
        <PrimaryChatText
          message={
            "オーダーグループが作成されました。" +
            "一緒にお食事をされる方をグループに招待することで" +
            "「グループ注文」ができます！" +
            "ぜひ、ご招待ください^^*"
          }
        />
        <div className="h-2"></div>
        <QRCodeCanvas
          value={"https://google.com/"}
          size={128}
          bgColor={"#FFFFFF"}
          fgColor={"#000000"}
          level={"L"}
          includeMargin={false}
          imageSettings={{
            src: "/favicon.ico",
            x: undefined,
            y: undefined,
            height: 24,
            width: 24,
            excavate: true,
          }}
        />
        <div className="h-2"></div>
        <button
          className="text-xs text-gray-400 shadow px-2 py-1 rounded"
          onClick={handleCopy}
        >
          招待リンクをコピー
        </button>
      </div>
    </PrimaryChatSenderInfo>
  );
}
