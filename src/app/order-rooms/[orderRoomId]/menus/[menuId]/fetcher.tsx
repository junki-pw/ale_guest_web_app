import { getCurrentDateTime } from "@/repositories/server_timestamp";
import { MenuDetailsState } from "./state";
import { HolidayBH } from "@/domain/holiday_bh";
import { getTodayHolidayBHs } from "@/repositories/holiday_bh";
import { NormalBH } from "@/domain/normal_bh";
import { getTodayNormalBHs } from "@/repositories/normal_bh";
import { getCategories } from "@/repositories/menu_category";
import { getOrderRoomById } from "@/repositories/order_room";
import { getShopById } from "@/repositories/shop";
import { getMenuById, getMenus } from "@/repositories/shop_menu";
import { getOptions } from "@/repositories/menu_option";
import {
  getOrderCartById,
  getOrderCartsContainedUnLimitedPlanById,
} from "@/repositories/order_cart";
import { ShopMenu } from "@/domain/shop_menu";
import { MenuCategory } from "@/domain/menu_category";
import { MenuOption } from "@/domain/shop_option";
import { Shop } from "@/domain/shop";
import { OrderCart } from "@/domain/order_cart";

interface orderRoomDetailsFetcherProps {
  orderRoomId: string;
  menuId: string | null;
  orderCartId: string | null;
}

export const menuDetailsDetailsFetcher: ({
  orderRoomId,
  menuId,
  orderCartId,
}: orderRoomDetailsFetcherProps) => Promise<MenuDetailsState> = async ({
  orderRoomId,
  menuId,
  orderCartId,
}: orderRoomDetailsFetcherProps) => {
  const orderRoom = await getOrderRoomById(orderRoomId);
  const currentDateTime: Date = await getCurrentDateTime();
  const holidaBHs: HolidayBH[] = await getTodayHolidayBHs(
    currentDateTime,
    orderRoom.shopId
  );
  const normalBHs: NormalBH[] = await getTodayNormalBHs(
    currentDateTime,
    orderRoom.shopId
  );
  const shop: Shop = await getShopById(orderRoom.shopId);
  const menus: ShopMenu[] = await getMenus(shop.shopId);
  const categories: MenuCategory[] = await getCategories(shop.shopId);
  const orderCart: OrderCart | null =
    orderCartId == null ? null : await getOrderCartById(orderCartId);
  const menu: ShopMenu = await getMenuById({
    menuId: orderCart?.menuId ?? menuId!,
    shopId: shop.shopId,
  });
  const options: MenuOption[] =
    menu.optionIds.length == 0 ? [] : await getOptions(shop.shopId);

  const isCart: boolean = orderCart != null;

  let selectedOptionMenus: { [key: string]: any[] } = {};

  if (isCart) {
    selectedOptionMenus = orderCart!.options;
  } else {
    for (let option of options) {
      if ((menu.optionIds as any).includes(option.optionId)) {
        selectedOptionMenus[option.optionId] = option.defaultMenuIds;
      }
    }
  }

  const unLimitedPlanOrderCarts: OrderCart[] =
    await getOrderCartsContainedUnLimitedPlanById(orderRoomId);

  return {
    shop: shop,
    menu: menu,
    normalBHs: normalBHs,
    holidayBHs: holidaBHs,
    selectedOptionMenus: selectedOptionMenus,
    orderRoom: orderRoom,
    currentDateTime: currentDateTime,
    menus: menus,
    options: options,
    categories: categories,
    orderCart: orderCart,
    unLimitedPlanOrderCarts: unLimitedPlanOrderCarts,
  };
};
