import { OrderCart, orderCartFromJson } from "@/domain/order_cart";
import { db } from "@/providers/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useMenusHooks = (orderRoomId: string) => {
  const [orderCarts, setOrderCarts] = useState<OrderCart[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "order_carts"),
      where("orderRoomId", "==", orderRoomId),
      orderBy("updatedAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      const orderCarts = snapshot.docs.map((e) => orderCartFromJson(e.data()));
      setOrderCarts(orderCarts);
    });
  });

  return { orderCarts };
};
