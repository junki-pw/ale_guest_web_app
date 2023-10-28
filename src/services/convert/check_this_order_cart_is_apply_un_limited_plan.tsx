import { OrderCart } from "@/domain/order_cart";
import { ShopMenu } from "@/domain/shop_menu";
import { searchMenu } from "../methods/search";

interface CheckThisOrderCartIsApplyUnLimitedPlanProviderProps {
  orderCart: OrderCart;
  unLimitedPlanOrderCarts: OrderCart[];
  menus: ShopMenu[];
  currentDateTime: Date | null;
}

export const checkThisOrderCartIsApplyUnLimitedPlanProvider = ({
  orderCart,
  unLimitedPlanOrderCarts,
  menus,
  currentDateTime,
}: CheckThisOrderCartIsApplyUnLimitedPlanProviderProps) => {
  for (var i = 0; i < unLimitedPlanOrderCarts.length; i++) {
    const orderCartContainUnLimitedMenu = unLimitedPlanOrderCarts[i];
    if (
      orderCart.orderRoomId != orderCartContainUnLimitedMenu.orderRoomId ||
      orderCartContainUnLimitedMenu.unLimitedPlanStartAt == null ||
      orderCartContainUnLimitedMenu.isDeleted ||
      orderCartContainUnLimitedMenu.orderId == null
    ) {
      continue;
    }

    const menu: ShopMenu = searchMenu(
      menus,
      orderCartContainUnLimitedMenu.menuId
    );

    if ((menu.unLimitedMenuIds as any[]).indexOf(orderCart.menuId) == -1) {
      continue;
    }

    /// 開始時刻
    const startAt: Date = orderCartContainUnLimitedMenu.unLimitedPlanStartAt!;

    /// ラストオーダー
    const minutes =
      menu.durationOfStayMinutes +
      orderCartContainUnLimitedMenu.unLimitedPlanExtraCharge -
      menu.lastOrderTimeMinutes;

    const lastOrderAt: Date = new Date(
      startAt.getFullYear(),
      startAt.getMonth(),
      startAt.getDay(),
      startAt.getHours(),
      startAt.getMinutes() + minutes
    );

    /// 開始時刻 <= 注文日 <= ラストオーダー　の場合のみ適用される
    const orderAt: Date | null = orderCart.orderAt ?? currentDateTime;
    if (orderAt != null && startAt < orderAt && orderAt < lastOrderAt) {
      return true;
    }
  }

  return false;
};
