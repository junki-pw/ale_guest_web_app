import { OrderCart } from "@/domain/order_cart";
import { OrderHistory } from "@/domain/order_history";
import { OrderRoom } from "@/domain/order_room";
import { Shop } from "@/domain/shop";
import { ShopMenu } from "@/domain/shop_menu";
import { MenuOption } from "@/domain/shop_option";

export interface OrderHistoriesState {
  orderCarts: OrderCart[];
  options: MenuOption[];
  menus: ShopMenu[];
  orderHistories: OrderHistory[];
  orderRoom: OrderRoom;
  currentDateTime: Date;
  shop: Shop;
  orderCartsContainUnLimitedMenu: OrderCart[];
}
