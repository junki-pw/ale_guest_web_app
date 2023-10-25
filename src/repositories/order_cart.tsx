import { OrderCart, orderCartFromJson } from "@/domain/order_cart";
import { db } from "@/providers/firebase";
import {
  Unsubscribe,
  collection,
  getCountFromServer,
  getDocs,
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

export const getOrderCarts: (
  orderRoomId: string
) => Promise<OrderCart[]> = async (orderRoomId: string) => {
  const q = query(
    collection(db, "order_carts"),
    where("orderRoomId", "==", orderRoomId)
  );
  return await getDocs(q).then((value) =>
    value.docs.map((e) => orderCartFromJson(e.data()))
  );
};
