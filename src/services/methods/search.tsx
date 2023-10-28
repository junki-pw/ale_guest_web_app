import {
  errorCategory,
  errorMenu,
  errorOption,
  errorOrderCart,
  errorSeat,
} from "@/constants/error";
import { MenuCategory } from "@/domain/menu_category";
import { OrderCart } from "@/domain/order_cart";
import { ShopMenu } from "@/domain/shop_menu";
import { MenuOption } from "@/domain/shop_option";
import { ShopSeat } from "@/domain/shop_seat";

export const searchMenu: (
  menus: ShopMenu[],
  menuId: string | null
) => ShopMenu = (menus: ShopMenu[], menuId: string | null) => {
  const index = menus.findIndex((element) => element.menuId == menuId);
  if (index == -1) {
    return errorMenu;
  }
  return menus[index];
};

export const searchOption: (
  options: MenuOption[],
  optionId: string | null
) => MenuOption = (options: MenuOption[], optionId: string | null) => {
  const index = options.findIndex((element) => element.optionId == optionId);
  if (index == -1) {
    return errorOption;
  }
  return options[index];
};

export const searchCategory: (
  categories: MenuCategory[],
  categoryId: string | null
) => MenuCategory = (categories: MenuCategory[], categoryId: string | null) => {
  const index = categories.findIndex(
    (element) => element.categoryId == categoryId
  );
  if (index == -1) {
    return errorCategory;
  }
  return categories[index];
};

export const searchOrderCart: (
  orderCarts: OrderCart[],
  orderCartId: string | null
) => OrderCart = (orderCarts: OrderCart[], orderCartId: string | null) => {
  const index = orderCarts.findIndex(
    (element) => element.orderCartId == orderCartId
  );
  if (index == -1) {
    return errorOrderCart;
  }
  return orderCarts[index];
};

export const searchSeat: (
  seats: ShopSeat[],
  seatId: string | null
) => ShopSeat = (seats: ShopSeat[], seatId: string | null) => {
  const index = seats.findIndex((element) => element.seatId == seatId);
  if (index == -1) {
    return errorSeat;
  }
  return seats[index];
};
