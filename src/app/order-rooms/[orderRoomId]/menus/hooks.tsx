import { OrderCart } from "@/domain/order_cart";
import { streamOrderCartsByOrderRoomId } from "@/repositories/order_cart";
import { useState } from "react";
import useSWR from "swr";

export const useMenusHooks = (orderRoomId: string) => {
  const [orderCarts, setOrderCarts] = useState<OrderCart[]>([]);

  useSWR("useMenusHooks/streamOrderCarts", () => {
    streamOrderCartsByOrderRoomId(orderRoomId, (orderCarts) => {
      setOrderCarts(orderCarts);
    });
  });

  return { orderCarts };
};
