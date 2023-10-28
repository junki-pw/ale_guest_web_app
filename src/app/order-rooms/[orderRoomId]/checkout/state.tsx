import { CoverCharge } from "@/domain/cover_charge";
import { OrderCart } from "@/domain/order_cart";
import { OrderPayment } from "@/domain/order_payment";
import { OrderRoom } from "@/domain/order_room";
import { OrderRoomUser } from "@/domain/order_room_user";
import { Shop } from "@/domain/shop";
import { ShopMenu } from "@/domain/shop_menu";
import { MenuOption } from "@/domain/shop_option";

export interface CheckoutState {
  shop: Shop;
  orderRoom: OrderRoom;
  orderCarts: OrderCart[];
  orderRoomUsers: OrderRoomUser[];
  menus: ShopMenu[];
  options: MenuOption[];
  customAmount: {};
  isLoading: boolean;
  paymentMap: {};
  orderCartsContainUnLimitedMenu: OrderCart[];
  coverCharge: CoverCharge | null;
}
