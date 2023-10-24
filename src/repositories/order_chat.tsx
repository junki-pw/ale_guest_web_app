import { OrderChat, orderChatFromJson } from "@/domain/order_chat";
import { db } from "@/providers/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export const getOrderChats: (
  orderRoomId: string
) => Promise<OrderChat[]> = async (orderRoomId: string) => {
  const q = query(collection(db, "order_rooms", orderRoomId, "order_chats"));
  return await getDocs(q).then((qs) => {
    return qs.docs.map((doc) => orderChatFromJson(doc.data()));
  });
};
