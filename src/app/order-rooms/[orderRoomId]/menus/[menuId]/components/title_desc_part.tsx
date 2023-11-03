import React from "react";
import { MenuDetailsState } from "../state";
import { checkThisMenuIsApplyUnLimitedPlan } from "@/services/convert/check_this_menu_is_apply_un_limited_plan";

interface MenuDetailsTitleDescPartProps {
  data: MenuDetailsState;
}

export default function MenuDetailsTitleDescPart({
  data,
}: MenuDetailsTitleDescPartProps) {
  const isApplyUnLimitedPlan: boolean = checkThisMenuIsApplyUnLimitedPlan({
    menu: data.menu,
    menus: data.menus,
    orderCartsContainedUnLimitedMenu: data.unLimitedPlanOrderCarts,
    currentDateTime: data.currentDateTime,
  });

  return (
    <div className="px-4">
      <h1 className="font-bold">{data.menu.menuName}</h1>
      <p className="mb-3 mt-1 text-gray-400 text-xs">
        {data.menu.menuDescription}
      </p>
      <h2
        className={`mb-4 text-xl font-bold ${
          isApplyUnLimitedPlan ? "text-green-500" : "text-orange-500"
        }`}
      >
        {isApplyUnLimitedPlan
          ? "放題プラン適用中"
          : `¥ ${data.menu.price.toLocaleString()}`}
      </h2>
    </div>
  );
}
