import { OrderRoom } from "@/domain/order_room";
import { MenusState } from "./state";
import { getOrderRoomById } from "@/repositories/order_room";
import { Shop } from "@/domain/shop";
import { getShopById } from "@/repositories/shop";
import { ShopMenu } from "@/domain/shop_menu";
import { getMenus } from "@/repositories/shop_menu";
import { MenuCategory } from "@/domain/menu_category";
import { getCategories } from "@/repositories/menu_category";
import { MenuOption } from "@/domain/shop_option";
import { getOptions } from "@/repositories/menu_option";
import { getCurrentDateTime } from "@/repositories/server_timestamp";

export const menusFetcher: (
  orderRoomId: string
) => Promise<MenusState> = async (orderRoomId: string) => {
  const orderRoom: OrderRoom = await getOrderRoomById(orderRoomId);
  const shop: Shop = await getShopById(orderRoom.shopId);
  const menus: ShopMenu[] = await getMenus(shop.shopId);
  const categories: MenuCategory[] = await getCategories(shop.shopId);
  const options: MenuOption[] = await getOptions(shop.shopId);
  const currentDateTime: Date = await getCurrentDateTime();

  return {
    orderRoom: orderRoom,
    shop: shop,
    menus: menus,
    options: options,
    currentDateTime: currentDateTime,
    categories: categories,
  };
};
