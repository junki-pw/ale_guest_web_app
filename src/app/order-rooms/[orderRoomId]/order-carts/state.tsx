import { OrderCart } from "@/domain/order_cart";
import { OrderRoom } from "@/domain/order_room";
import { Shop } from "@/domain/shop";
import { ShopMenu } from "@/domain/shop_menu";
import { MenuOption } from "@/domain/shop_option";

export interface OrderCartState {
  shop: Shop;
  orderRoom: OrderRoom;
  orderCarts: OrderCart[];
  menus: ShopMenu[];
  options: MenuOption[];
  currentDateTime: Date;
  unLimitedMenuOrderCarts: OrderCart[];
}
