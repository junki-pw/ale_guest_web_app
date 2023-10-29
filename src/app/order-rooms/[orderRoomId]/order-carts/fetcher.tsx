import { getShopById } from "@/repositories/shop";
import { OrderCartState } from "./state";
import { getOrderRoomById } from "@/repositories/order_room";
import { getOrderCarts } from "@/repositories/order_cart";
import { getMenus } from "@/repositories/shop_menu";
import { getOptions } from "@/repositories/menu_option";
import { getCurrentDateTime } from "@/repositories/server_timestamp";
import { MenuOption } from "@/domain/shop_option";
import { ShopMenu } from "@/domain/shop_menu";
import { OrderCart } from "@/domain/order_cart";
import { Shop } from "@/domain/shop";
import { OrderRoom } from "@/domain/order_room";

export const orderCartFetcher: (
  orderRoomId: string
) => Promise<OrderCartState> = async (orderRoomId: string) => {
  const orderRoom: OrderRoom = await getOrderRoomById(orderRoomId);
  const shop: Shop = await getShopById(orderRoom.shopId);
  const orderCarts: OrderCart[] = await getOrderCarts(orderRoomId);
  const menus: ShopMenu[] = await getMenus(shop.shopId);
  const options: MenuOption[] = await getOptions(shop.shopId);
  const currentDateTime: Date = await getCurrentDateTime();

  return {
    shop: shop,
    orderRoom: orderRoom,
    orderCarts: orderCarts,
    menus: menus,
    options: options,
    currentDateTime: currentDateTime,
    unLimitedMenuOrderCarts: [],
  };
};
