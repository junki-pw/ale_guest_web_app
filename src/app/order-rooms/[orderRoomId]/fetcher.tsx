import { OrderChat } from "@/domain/order_chat";
import { OrderRoom } from "@/domain/order_room";
import { Shop } from "@/domain/shop";
import { auth } from "@/providers/firebase";
import { OrderRoomState } from "./state";
import {
  doc_not_found,
  order_room_closed,
  user_not_joined,
} from "@/constants/error";
import { getOrderRoomById } from "@/repositories/order_room";
import { getShopById } from "@/repositories/shop";
import { getOrderChats } from "@/repositories/order_chat";
import { ShopSeat } from "@/domain/shop_seat";
import { getSeatById } from "@/repositories/shop_seat";

export const orderRoomFetcher: (
  orderRoomId: string
) => Promise<OrderRoomState> = async (orderRoomId: string) => {
  console.log("orderRoomFetcher 発火");
  const uid = auth.currentUser?.uid;
  if (uid == undefined) {
    throw doc_not_found;
  }

  /// OrderRoom を取得する
  const orderRoom: OrderRoom = await getOrderRoomById(orderRoomId);

  // エラー処理
  if (orderRoom == null) {
    throw doc_not_found;
  } else if ((orderRoom.userIds as any[]).indexOf(uid) == -1) {
    if (orderRoom.isClosed) {
      throw order_room_closed;
    }
    throw user_not_joined;
  }

  //todo Shop を取得
  const shop: Shop = await getShopById(orderRoom.shopId);

  /// OrderChats 取得
  const orderChats: OrderChat[] = await getOrderChats(orderRoom.orderRoomId);
  console.log("orderChats length: " + orderChats.length);

  /// unRead count を0にする
  const seat: ShopSeat = await getSeatById(shop.shopId, orderRoom.seatId);

  return {
    orderRoom: orderRoom,
    shop: shop,
    orderChats: orderChats,
    seat: seat,
  };
};
