import { OrderCart } from "@/domain/order_cart";
import { AppUser } from "@/domain/user";
import { convertIsReducedTaxRate } from "../convert/string";
import { serverTimestamp } from "firebase/firestore";
import { Shop } from "@/domain/shop";

interface CreateOrderCartProps {
  orderCartId: string;
  orderRoomId: string;
  shop: Shop;
  userIds: [];
  options: {};
  menuId: string;
  currentUser: AppUser;
  orderedMenuAmount: number;
}

export function createOrderCart({
  orderCartId,
  orderRoomId,
  shop,
  userIds,
  options,
  menuId,
  currentUser,
  orderedMenuAmount,
}: CreateOrderCartProps): OrderCart {
  return {
    orderCartId: orderCartId,
    orderRoomId: orderRoomId,
    shopId: shop.shopId,
    userIds: userIds,
    options: options,
    serveStatus: "preparing",
    orderCartNumber: 0,
    unLimitedPlanExtraCharge: 0,
    unLimitedPlanExtraTime: 0,
    isDeleted: false,
    isReducedTaxRate: convertIsReducedTaxRate(shop),
    orderedFromGuest: true,
    corrects: [],
    servedPlanMenuIds: [],
    courseMenuOptions: {},
    planMenusServeStatus: {},
    userId: currentUser.userId,
    userIcon: currentUser.userIcon,
    userName: currentUser.userName,
    customMenuMemo: null,
    customMenuName: null,
    customMenuGenre: null,
    orderId: null,
    deleteUserId: null,
    deleteUserName: null,
    deleteUserIcon: null,
    menuId: menuId,
    customMenuPrice: null,
    orderedMenuAmount: orderedMenuAmount,
    unLimitedPlanStartAt: null,
    deletedAt: null,
    orderAt: null,
    servedAt: null,
    printedAt: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}
