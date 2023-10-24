import { OrderRoom } from "@/domain/order_room";
import { ShopSeat } from "@/domain/shop_seat";
import { getOrderRoomById } from "@/repositories/order_room";
import { CheckJoinState } from "./state";
import { Shop } from "@/domain/shop";
import { getShopById } from "@/repositories/shop";

export const checkJoinFetcher: (
  orderRoomId: string
) => Promise<CheckJoinState> = async (orderRoomId: string) => {
  //orderRoomを取得
  const orderRoom: OrderRoom = await getOrderRoomById(orderRoomId);
  //シート取得
  //   const seat:ShopSeat = await getSeatById(orderRoom.seatId);
  //coverCharge

  //shop
  const shop: Shop = await getShopById(orderRoom.shopId);
  //orderRoomUsers
  //オーダー数
  return { orderRoom: orderRoom, shop: shop };
};
