import { OrderChat } from "@/domain/order_chat";
import { OrderRoom } from "@/domain/order_room";
import { Shop } from "@/domain/shop";

export interface OrderRoomState {
  orderRoom: OrderRoom;
  shop: Shop;
  orderChats: OrderChat[];
}
