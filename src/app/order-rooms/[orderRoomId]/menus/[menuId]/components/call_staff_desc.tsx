import React from "react";
import { MenuDetailsState } from "../state";

interface MenuDetailsCallStaffDescProps {
  data: MenuDetailsState;
}

export default function MenuDetailsCallStaffDesc({
  data,
}: MenuDetailsCallStaffDescProps) {
  const isCallStaffMenu: boolean =
    data.menu.isUnLimitedPlan ||
    (data.menu.menuType == "plan" && !data.menu.isSetPlan);

  if (isCallStaffMenu) {
    return (
      <div className="px-4 mb-3">
        <div className="p-3 bg-orange-50 rounded-md">
          <p className="text-orange-500 font-bold text-xs">
            注意：
            <br />
            こちらのプランはアプリから注文する事ができません。
            <br />
            ご注文する際はお近くのスタッフにお知らせ下さい。
          </p>
        </div>
      </div>
    );
  }
}
