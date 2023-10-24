import { OrderPayment } from "@/domain/order_payment";
import { Payer } from "@/domain/payer";

export interface OrderPaymentState {
  orderPayment: OrderPayment;
  payer: Payer;
}
