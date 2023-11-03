import { OrderCart } from "@/domain/order_cart";
import { ShopMenu } from "@/domain/shop_menu";
import { searchMenu } from "../methods/search";

interface CheckThisMenuIsApplyUnLimitedPlanProps {
  menu: ShopMenu;
  menus: ShopMenu[];
  orderCartsContainedUnLimitedMenu: OrderCart[];
  currentDateTime: Date;
}

export function checkThisMenuIsApplyUnLimitedPlan({
  menu,
  menus,
  orderCartsContainedUnLimitedMenu,
  currentDateTime,
}: CheckThisMenuIsApplyUnLimitedPlanProps) {
  let isApply = false;

  for (const orderCart of orderCartsContainedUnLimitedMenu) {
    const unLimitedMenu = searchMenu(menus, orderCart.menuId);

    //todo この order_cart が放題プランを時間的に適用中かどうか
    const startAt: Date | null = orderCart.unLimitedPlanStartAt;
    if (startAt == null) {
      continue;
    }

    // ラストオーダー時間
    const lastOrderAt = new Date(
      startAt.getFullYear(),
      startAt.getMonth(),
      startAt.getDate(),
      startAt.getHours(),
      startAt.getMinutes() +
        unLimitedMenu.durationOfStayMinutes -
        unLimitedMenu.lastOrderTimeMinutes +
        orderCart.unLimitedPlanExtraTime
    );

    if (currentDateTime > lastOrderAt) {
      continue;
    }

    // この order_cart が含む放題メニューに menu が存在するかどうか
    if ((unLimitedMenu.unLimitedMenuIds as any).includes(menu.menuId)) {
      isApply = true;
      break;
    }
  }

  return isApply;
}
