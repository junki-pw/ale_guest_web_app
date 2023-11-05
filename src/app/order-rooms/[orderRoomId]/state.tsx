import { OrderChat } from "@/domain/order_chat";
import { OrderRoom } from "@/domain/order_room";
import { Shop } from "@/domain/shop";
import { ShopSeat } from "@/domain/shop_seat";

export interface OrderRoomState {
  orderRoom: OrderRoom;
  shop: Shop;
  orderChats: OrderChat[];
  seat: ShopSeat;
  orderPaymentMap: {};
  payerMap: {};
  checkoutPayersMap: {};
}
