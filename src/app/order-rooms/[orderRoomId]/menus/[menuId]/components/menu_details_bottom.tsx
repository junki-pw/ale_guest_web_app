import { calcMenuAmount } from "@/services/calc/menu";
import React, { MouseEventHandler, useState } from "react";
import { MenuDetailsState } from "../state";
import { convertIsReducedTaxRate } from "@/services/convert/string";
import { saveOrderCart } from "@/repositories/order_cart";
import { useRouter } from "next/navigation";
import { AppUser } from "@/domain/user";
import { useCurrentUser } from "@/hooks/current_user";
import { checkThisMenuIsApplyUnLimitedPlan } from "@/services/convert/check_this_menu_is_apply_un_limited_plan";

interface MenuDetailsBottomProps {
  data: MenuDetailsState;
}

export default function MenuDetailsBottom({ data }: MenuDetailsBottomProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(
    data.orderCart == null ? 1 : data.orderCart.userIds.length
  );

  function decrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const isApplyUnLimitedPlan: boolean = checkThisMenuIsApplyUnLimitedPlan({
    menu: data.menu,
    menus: data.menus,
    orderCartsContainedUnLimitedMenu: data.unLimitedPlanOrderCarts,
    currentDateTime: data.currentDateTime,
  });

  const amount: number = calcMenuAmount({
    menu: data.menu,
    optionList: data.options,
    options: data.selectedOptionMenus,
    orderCount: quantity,
    shop: data.shop,
    isReducedTaxRate: convertIsReducedTaxRate(data.shop),
    discounts: [],
  });

  const { currentUser } = useCurrentUser();

  async function handleSaveOrderCart() {
    let userIds: any[] = [];
    for (var i = 0; i < quantity; i++) {
      userIds = [...userIds, currentUser!.userId];
    }

    const saveOrderCartProps = {
      orderRoom: data.orderRoom,
      shop: data.shop,
      userIds: userIds,
      currentUser: currentUser as AppUser,
      menuId: data.menu.menuId,
      options: data.options,
      menus: data.menus,
      selectedOptions: data.selectedOptionMenus,
      previousOrderCart: data.orderCart,
    };
    await saveOrderCart(saveOrderCartProps)
      .then((value) => router.back())
      .catch((e) => alert(e));
  }

  return (
    <div className="fixed bottom-4 flex w-full px-4">
      <div className="flex h-[48px] items-center bg-orange-100 px-4 rounded-lg">
        <_Button isMinus={true} onClick={decrement} />
        <h1 className="w-[60px] text-center font-bold text-lg text-orange-500">
          {quantity}
        </h1>
        <_Button isMinus={false} onClick={() => setQuantity(quantity + 1)} />
      </div>
      <button
        className={`ml-3 py-3 grow rounded-lg text-white font-bold ${
          isApplyUnLimitedPlan ? "bg-green-500" : "bg-orange-500"
        }`}
        onClick={handleSaveOrderCart}
      >
        カートに追加・
        {isApplyUnLimitedPlan ? "¥0" : `¥${amount.toLocaleString()}`}
      </button>
    </div>
  );
}

interface Props {
  isMinus: boolean;
  onClick?: MouseEventHandler | undefined;
}

function _Button({ isMinus, onClick }: Props) {
  return (
    <button
      className={`
            rounded-full h-min w-min text-justify
            ${isMinus ? "px-2" : "px-1.5"}
            ${isMinus ? "bg-white" : "bg-orange-500"}
            ${isMinus ? "text-orange-500" : "text-white"}
            `}
      onClick={onClick}
    >
      {isMinus ? "-" : "+"}
    </button>
  );
}
