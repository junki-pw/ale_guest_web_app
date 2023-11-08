import useSWRSubscription from "swr/subscription";
import { streamOrderCartsByOrderRoomId } from "@/repositories/order_cart";
import useSWR from "swr";

export function useStreamOrderCartsById(orderRoomId: string) {
  const { data, mutate } = useSWR(`order-rooms/${orderRoomId}/order-carts`);

  useSWRSubscription(
    `/useStreamOrderCartsById/${orderRoomId}`,
    (key, { next }) => {
      streamOrderCartsByOrderRoomId(data.orderRoom.orderRoomId, (orderCarts) =>
        mutate({ ...data, orderCarts }, false)
      );
    }
  );
}
