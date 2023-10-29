import { CoverCharge } from "@/domain/cover_charge";
import { OrderRoom } from "@/domain/order_room";
import { OrderRoomUser } from "@/domain/order_room_user";
import { Shop } from "@/domain/shop";
import { ShopSeat } from "@/domain/shop_seat";

export interface CheckJoinState {
  orderRoom: OrderRoom;
    shop: Shop;
    seat: ShopSeat;
    coverCharge: CoverCharge | null;
    orderRoomUsers: OrderRoomUser[];
    orderedCount: number;
    isLoading: boolean;
}
