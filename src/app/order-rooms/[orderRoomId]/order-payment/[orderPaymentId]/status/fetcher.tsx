import { OrderPayment } from "@/domain/order_payment";
import { OrderRoom } from "@/domain/order_room";
import { OrderRoomUser } from "@/domain/order_room_user";
import { Payer } from "@/domain/payer";
import { getOrderPaymentById } from "@/repositories/order_payment";
import { getOrderRoomById } from "@/repositories/order_room";
import { getOrderRoomUsers } from "@/repositories/order_room_user";
import { getPayers } from "@/repositories/payer";
import { CheckoutStatusState } from "./state";

interface CheckoutStatusProps {
  orderRoomId: string;
  orderPaymentId: string;
}

export const checkoutStatusFetcher: ({
  orderRoomId,
  orderPaymentId,
}: CheckoutStatusProps) => Promise<CheckoutStatusState> = async ({
  orderRoomId,
  orderPaymentId,
}: CheckoutStatusProps) => {
  const orderRoom: OrderRoom = await getOrderRoomById(orderRoomId);
  const orderPayment: OrderPayment = await getOrderPaymentById(orderPaymentId);
  const orderRoomUsers: OrderRoomUser[] = await getOrderRoomUsers(orderRoomId);
  const payers: Payer[] = await getPayers(orderPaymentId);

  return {
    orderPayment: orderPayment,
    payers: payers,
    orderRoomUsers: orderRoomUsers,
    orderRoom: orderRoom,
  };
};
