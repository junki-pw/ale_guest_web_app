import { OrderCart } from "@/domain/order_cart";
import { streamOrderCartsByOrderRoomId } from "@/repositories/order_cart";
import { useEffect, useState } from "react";

export const useMenusHooks = (orderRoomId: string) => {
  const [orderCarts, setOrderCarts] = useState<OrderCart[]>([]);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    console.log("useEffect");

    if (initial) {
      setInitial(false);
      streamOrderCartsByOrderRoomId(orderRoomId, (orderCarts) => {
        setOrderCarts(orderCarts);
        console.log("orderCarts: " + orderCarts.length);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { orderCarts };
};
