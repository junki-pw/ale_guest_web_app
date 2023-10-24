import { orderCartFromJson } from "@/domain/order_cart";
import { db } from "@/providers/firebase";
import {
  Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const streamOrderCartsByOrderRoomId: (
  orderRoomId: string
) => Unsubscribe = (orderRoomId: string) => {
  const q = query(
    collection(db, "order_carts"),
    where("orderRoomId", "==", orderRoomId),
    orderBy("updatedAt", "desc")
  );

  return onSnapshot(q, (snapshot) => snapshot);
};
