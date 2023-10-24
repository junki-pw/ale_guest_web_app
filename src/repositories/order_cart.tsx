import { orderCartFromJson } from "@/domain/order_cart";
import { db } from "@/providers/firebase";
import {
  Unsubscribe,
  collection,
  getCountFromServer,
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

export const getOrderedCount: (orderRoomId: string) => Promise<number> = async (
  orderRoomId: string
) => {
  const q = query(
    collection(db, "order_carts"),
    where("orderRoomId", "==", orderRoomId),
    where("isActive", "==", true)
  );

  return await getCountFromServer(q).then((value) => value.data().count);
};
