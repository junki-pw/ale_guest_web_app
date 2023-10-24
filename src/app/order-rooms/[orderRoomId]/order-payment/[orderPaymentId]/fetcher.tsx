import { getOrderPaymentById } from "@/repositories/order_payment";
import { OrderPaymentState } from "./state";
import { OrderPayment } from "@/domain/order_payment";
import useSWR from "swr";
import { auth } from "@/providers/firebase";
import { Payer } from "@/domain/payer";
import { getPayerById } from "@/repositories/payer";

export const orderPaymentFetcher: (
  orderPaymentId: string
) => Promise<OrderPaymentState> = async (orderPaymentId: string) => {
  const orderPayment: OrderPayment = await getOrderPaymentById(orderPaymentId);

  const payer: Payer = await getPayerById(
    orderPaymentId,
    auth.currentUser!.uid
  );

  return {
    orderPayment: orderPayment,
    payer: payer,
  };
};
