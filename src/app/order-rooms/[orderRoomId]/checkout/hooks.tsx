import { streamOrderCartsByOrderRoomId } from "@/repositories/order_cart";
import { streamOrderPaymentsById } from "@/repositories/order_payment";
import { useState } from "react";
import useSWR from "swr";
import { OrderCart } from "@/domain/order_cart";

export function useCheckoutHooks(orderRoomId: string) {
  const [orderPaymentMap, setOrderPaymentMap] = useState({});
  const [orderCarts, setOrderCarts] = useState<OrderCart[]>([]);

  /// OrderCarts の監視
  useSWR("useCheckoutHooks/streamOrderCartsByOrderRoomId", () => {
    streamOrderCartsByOrderRoomId(orderRoomId, (orderCarts) =>
      setOrderCarts(orderCarts)
    );
  });

  /// OrderPayments の監視
  useSWR("useCheckoutHooks/streamOrderPaymentsById", () => {
    streamOrderPaymentsById(orderRoomId, (orderPayments) => {
      let paymentMap: {} = {};
      for (const orderPayment of orderPayments) {
        paymentMap = {
          ...paymentMap,
          [`${orderPayment.orderPaymentId}`]: orderPayment,
        };
      }
      setOrderPaymentMap(paymentMap);
    });
  });

  return { orderCarts, orderPaymentMap };
}
