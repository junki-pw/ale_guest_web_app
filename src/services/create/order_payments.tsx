import { OrderPayment } from "@/domain/order_payment";
import { serverTimestamp } from "firebase/firestore";

interface CreateOrderPaymentProps {
  orderPaymentId: string;
  shopId: string;
  userId: string;
  orderRoomId: string;
  amount: number;
  appetizerAmount: number;
  coverChargeAmount: number;
  orderAmount: number;
}

export function createOrderPayment({
  orderPaymentId,
  shopId,
  userId,
  orderRoomId,
  amount,
  appetizerAmount,
  coverChargeAmount,
  orderAmount,
}: CreateOrderPaymentProps): OrderPayment {
  return {
    orderPaymentId,
    shopId,
    userId,
    orderRoomId,
    amount,
    appetizerAmount,
    coverChargeAmount,
    orderAmount,
    status: "request",
    changeAmount: null,
    cashAmount: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}
