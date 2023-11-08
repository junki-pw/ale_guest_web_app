import useSWRSubscription from "swr/subscription";
import { getLocalOrderCarts } from "@/repositories/order_cart";
import useSWR from "swr";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/providers/firebase";
import { orderCartsCollection } from "@/constants/firebase";

export function useStreamOrderCartsById(orderRoomId: string) {
  const { data, mutate } = useSWR(`order-rooms/${orderRoomId}/order-carts`);

  useSWRSubscription(
    `/useStreamOrderCartsById/${orderRoomId}`,
    (key, { next }) => {
      const q = query(
        collection(db, orderCartsCollection),
        where("orderRoomId", "==", orderRoomId)
      );

      const unSub = onSnapshot(q, () =>
        getLocalOrderCarts(data.orderRoom.orderRoomId).then((orderCarts) =>
          mutate({ ...data, orderCarts }, false)
        )
      );

      return () => unSub && unSub();
    }
  );
}
