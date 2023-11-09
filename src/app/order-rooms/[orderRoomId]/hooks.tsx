import { useCurrentUser } from "@/hooks/current_user";
import useSWR from "swr";
import { useState } from "react";
import { streamOrderChats } from "@/repositories/order_chat";
import { streamOrderPaymentsById } from "@/repositories/order_payment";
import { getPayerById, getPayers } from "@/repositories/payer";
import { OrderPayment } from "@/domain/order_payment";
import { OrderChat } from "@/domain/order_chat";
import { orderPaymentData } from "./state";

export function useOrderRoomHooks(orderRoomId: string) {
  const [orderChats, setOrderChats] = useState<OrderChat[]>([]);
  const [orderPaymentData, setOrderPaymentData] = useState<orderPaymentData>({
    orderPaymentMap: {},
    payerMap: {},
    checkoutPayersMap: {},
  });

  const { currentUser } = useCurrentUser();

  /// order chats の監視
  useSWR(`useOrderRoomHooks/streamOrderChats`, async () => {
    streamOrderChats(orderRoomId, async (latestOrderChats) => {
      setOrderChats(latestOrderChats);
    });
  });

  /// order payments の監視
  useSWR("useOrderRoomHooks/streamOrderPayments", async () => {
    streamOrderPaymentsById(orderRoomId, async (orderPayments) => {
      console.log("orderPaymentsをリッスン");

      let orderPaymentMap: {} = {};
      for (const orderPayment of orderPayments) {
        orderPaymentMap = {
          ...orderPaymentMap,
          [`${orderPayment.orderPaymentId}`]: orderPayment,
        };
      }

      const payerMap = await getPayerMap(currentUser!.userId, orderPayments);

      const payersWhoCheckoutPayment = await getPayersWhoCheckoutPayment(
        orderPaymentData.checkoutPayersMap,
        orderPayments
      );

      setOrderPaymentData({
        orderPaymentMap,
        payerMap,
        checkoutPayersMap: {
          ...orderPaymentData.checkoutPayersMap,
          ...payersWhoCheckoutPayment,
        },
      });
    });
  });

  return { orderChats, orderPaymentData };
}

/// 一番下にスクロール
export async function scrollBottom() {
  await new Promise((resolve) => setTimeout(resolve, 10));
  var element = document.documentElement;
  var bottom = element.scrollHeight - element.clientHeight;
  window.scroll(0, bottom);
}

async function getPayerMap(
  userId: string,
  orderPayments: OrderPayment[]
): Promise<{}> {
  let payerMap: {} = {};
  for (const orderPayment of orderPayments) {
    await getPayerById(orderPayment.orderPaymentId, userId)
      .then((value) => {
        payerMap = {
          ...payerMap,
          [`${orderPayment.orderPaymentId}`]: value,
        };
      })
      .catch((e) => {
        console.log(
          "payer データが見つかりませんでした: " + orderPayment.orderPaymentId
        );
      });
  }

  return payerMap;
}

async function getPayersWhoCheckoutPayment(
  checkoutPayersMap: {},
  orderPayments: OrderPayment[]
): Promise<{}> {
  let payersWhoCheckoutPayment: {} = {};
  for (const payment of orderPayments) {
    if (
      payment.status == "completed" &&
      (checkoutPayersMap as any)[payment.orderPaymentId] == null
    ) {
      await getPayers(payment.orderPaymentId).then((value) => {
        payersWhoCheckoutPayment = {
          ...payersWhoCheckoutPayment,
          [`${payment.orderPaymentId}`]: value,
        };
      });
    }
  }

  return payersWhoCheckoutPayment;
}
