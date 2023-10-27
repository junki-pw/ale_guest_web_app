import { HolidayBH } from "@/domain/holiday_bh";
import { MenuCategory } from "@/domain/menu_category";
import { NormalBH } from "@/domain/normal_bh";
import { OrderCart } from "@/domain/order_cart";
import { OrderRoom } from "@/domain/order_room";
import { Shop } from "@/domain/shop";
import { ShopMenu } from "@/domain/shop_menu";
import { MenuOption } from "@/domain/shop_option";

export interface MenuDetailsState {
  shop: Shop;
  menu: ShopMenu;
  normalBHs: NormalBH[];
  holidayBHs: HolidayBH[];
  options: MenuOption[];
  menus: ShopMenu[];
  currentDateTime: Date;
  categories: MenuCategory[];
  // { optionId : selectedMenuIds }
  selectedOptionMenus: {};
  orderRoom: OrderRoom;
  orderCart: OrderCart | null;
  unLimitedPlanOrderCarts: OrderCart[];
}

// 将来的には下記2つを入れる必要あり
// selectedUserIds: string[] // カートに入れてる数をuserIdsで判断する
// orderRoomUsers: OrderRoomUser[];
