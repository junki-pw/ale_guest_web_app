import { OrderPayment } from "@/domain/order_payment";
import { OrderRoom } from "@/domain/order_room";
import { OrderRoomUser } from "@/domain/order_room_user";
import { Payer } from "@/domain/payer";

export interface CheckoutStatusState {
  orderPayment: OrderPayment;
  payers: Payer[];
  orderRoomUsers: OrderRoomUser[];
  orderRoom: OrderRoom;
}
