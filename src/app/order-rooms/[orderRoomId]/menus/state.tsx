import { OrderRoom } from "@/domain/order_room";
import { Shop } from "@/domain/shop";
import { MenuCategory } from "@/domain/menu_category";
import { ShopMenu } from "@/domain/shop_menu";
import { MenuOption } from "@/domain/shop_option";
import { NormalBH } from "@/domain/normal_bh";
import { HolidayBH } from "@/domain/holiday_bh";
import { OrderCart } from "@/domain/order_cart";

export interface MenusState {
  shop: Shop;
  menus: ShopMenu[];
  categories: MenuCategory[];
  options: MenuOption[];
  currentDateTime: Date;
  orderRoom: OrderRoom;
  normalBHs: NormalBH[];
  holidayBHs: HolidayBH[];
  orderCarts: OrderCart[];
  unLimitedPlanMenuOrderCarts: OrderCart[];
}
