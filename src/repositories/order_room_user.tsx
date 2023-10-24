import { OrderRoomUser, orderRoomUserFromJson } from "@/domain/order_room_user";
import { db } from "@/providers/firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

export const getOrderRoomUsers: (
  orderRoomId: string
) => Promise<OrderRoomUser[]> = async (orderRoomId: string) => {
  return await getDocs(
    query(collection(db, "order_rooms", orderRoomId, "order_room_users"))
  ).then((value) => {
    return value.docs.map((e) => orderRoomUserFromJson(e.data()));
  });
};
