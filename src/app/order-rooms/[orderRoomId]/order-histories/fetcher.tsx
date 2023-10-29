import { getOrderRoomById } from "@/repositories/order_room";
import { OrderHistoriesState } from "./state";
import { getMenus } from "@/repositories/shop_menu";
import { getShopById } from "@/repositories/shop";
import { getOptions } from "@/repositories/menu_option";
import { getOrderCarts } from "@/repositories/order_cart";
import { getCurrentDateTime } from "@/repositories/server_timestamp";
import { getOrderHistories } from "@/repositories/order_history";

export const orderHistoriesFetcher: (
  orderRoomId: string
) => Promise<OrderHistoriesState> = async (orderRoomId: string) => {
  const orderRoom = await getOrderRoomById(orderRoomId);
  const shop = await getShopById(orderRoom.shopId);
  const menus = await getMenus(shop.shopId);
  const options = await getOptions(shop.shopId);
  const orderCarts = await getOrderCarts(orderRoomId);
  const currentDateTime = await getCurrentDateTime();
  const orderHistories = await getOrderHistories(orderRoomId);

  return {
    orderCarts: orderCarts,
    options: options,
    menus: menus,
    orderHistories: orderHistories,
    orderRoom: orderRoom,
    currentDateTime: currentDateTime,
    shop: shop,
    orderCartsContainUnLimitedMenu: [],
  };
};
