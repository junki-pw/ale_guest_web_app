import React from "react";
import PrimaryChatSenderInfo from "./message_type/sub/primary_chat_sender_info";
import PrimaryChatText from "./message_type/sub/primary_chat_text";
import { OrderChatProps } from "../page";

export default function OrderChatTextMessage({ orderChat }: OrderChatProps) {
  return (
    <PrimaryChatSenderInfo orderChat={orderChat}>
      <PrimaryChatText message={orderChat.message} />
    </PrimaryChatSenderInfo>
  );
}
