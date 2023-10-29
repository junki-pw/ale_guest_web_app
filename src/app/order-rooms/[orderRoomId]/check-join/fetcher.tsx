import { OrderRoom } from "@/domain/order_room";
import { ShopSeat } from "@/domain/shop_seat";
import { getOrderRoomById } from "@/repositories/order_room";
import { CheckJoinState } from "./state";
import { Shop } from "@/domain/shop";
import { getShopById } from "@/repositories/shop";
import { getSeatById } from "@/repositories/shop_seat";
import { CoverCharge } from "@/domain/cover_charge";
import { getCoverCharge } from "@/repositories/cover_charge";
import { getOrderRoomUsers } from "@/repositories/order_room_user";
import { OrderRoomUser } from "@/domain/order_room_user";
import { getOrderedCount } from "@/repositories/order_cart";

export const checkJoinFetcher: (
  orderRoomId: string
) => Promise<CheckJoinState> = async (orderRoomId: string) => {
  //orderRoomを取得
  const orderRoom: OrderRoom = await getOrderRoomById(orderRoomId);
  console.log("1");

  //シート取得
  // const seat: ShopSeat = await getSeatById(orderRoom.seatId);
  console.log("2");

  //coverCharge
  // const coverCharge: CoverCharge = await getCoverCharge(orderRoom.shopId);
  console.log("3");

  //shop
  const shop: Shop = await getShopById(orderRoom.shopId);
  console.log("4");
  //orderRoomUsers
  const orderRoomUsers: OrderRoomUser[] = await getOrderRoomUsers(orderRoomId);
  console.log("5");

  //オーダー数
  const orderCount: number = await getOrderedCount(orderRoomId);
  console.log("6");

  return {
    orderRoom: orderRoom,
    // seat: seat,
    // coverCharge: coverCharge,
    shop: shop,
    orderRoomUsers: orderRoomUsers,
    orderedCount: orderCount,
    isLoading: false,
  };
};
