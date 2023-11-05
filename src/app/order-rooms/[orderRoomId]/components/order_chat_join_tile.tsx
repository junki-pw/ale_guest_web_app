import { OrderChat } from "@/domain/order_chat";

interface OrderChatJoinTileProps {
  orderChat: OrderChat;
}

export default function OrderChatJoinTile({
  orderChat,
}: OrderChatJoinTileProps) {
  const createdAt: Date = orderChat.createdAt ?? new Date();
  const month: number = createdAt.getMonth();
  const day: number = createdAt.getDate();
  const hour: number = createdAt.getHours();
  const minutes: number = createdAt.getMinutes();

  return (
    <div className="mb-4 py-1 px-2 text-center text-xs text-gray-400 bg-gray-50 mx-4 rounded-md">
      {month}月{day}日 {hour}:{minutes}
      <br />
      {orderChat.senderName}さんが参加しました
    </div>
  );
}
