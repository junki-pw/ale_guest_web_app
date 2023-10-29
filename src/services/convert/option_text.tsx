import { OrderCart } from "@/domain/order_cart";
import { searchMenu } from "../methods/search";
import { ShopMenu } from "@/domain/shop_menu";

interface _ConvertOptionTexts {
  orderCart: OrderCart;
  menus: ShopMenu[];
}

export const convertOptionTexts: ({
  orderCart,
  menus,
}: _ConvertOptionTexts) => string | null = ({
  orderCart,
  menus,
}: _ConvertOptionTexts) => {
  // option を持っているかどうかを判断
  const isNotHavingOptions =
    ((orderCart.courseMenuOptions as any) ?? (orderCart.options as any) ?? {})
      .length == 0;

  if (orderCart.menuId == null || isNotHavingOptions) {
    return null;
  }

  let optionTexts: string[] = [];

  const menu: ShopMenu = searchMenu(menus, orderCart.menuId);

  if (menu.isSetPlan == false) {
    // コース料理のオプションs
    for (const [optionId, selectedCourseMenus] of Object.entries(
      orderCart.courseMenuOptions
    )) {
      for (const [menuId, count] of Object.entries(
        selectedCourseMenus as any
      )) {
        const menu = searchMenu(menus, menuId);
        optionTexts = [...optionTexts, menu.menuName];
      }
    }
  } else {
    // 通常メニューのオプションs
    for (const [optionId, menuIds] of Object.entries(orderCart.options)) {
      for (const menuId of menuIds as any) {
        const menu = searchMenu(menus, menuId);
        optionTexts = [...optionTexts, menu.menuName];
      }
    }
  }

  return optionTexts.join("、");
};
