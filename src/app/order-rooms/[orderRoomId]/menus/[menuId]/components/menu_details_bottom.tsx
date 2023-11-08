import React from "react";
import { MenuDetailsState } from "../state";
import MenuDetailsCallStaffButton from "./bottom_buttons/call_staff";
import MenuDetailsAddCartButton from "./bottom_buttons/add_cart_button";
import MenuDetailsPrimaryBottomButton from "./bottom_buttons/bottom_button";
import { checkIsOpening } from "@/services/convert/check_is_opening";
import { checkIsServiceAvailable } from "@/services/convert/check_is_service_available";
import { searchCategory } from "@/services/methods/search";

interface MenuDetailsBottomProps {
  data: MenuDetailsState;
}

export default function MenuDetailsBottom({ data }: MenuDetailsBottomProps) {
  // 営業時間外
  const isOpen: boolean = checkIsOpening({
    currentDateTime: data.currentDateTime,
    normalBHs: data.normalBHs,
    holidayBHs: data.holidayBHs,
  });

  if (!isOpen) {
    return (
      <MenuDetailsPrimaryBottomButton
        buttonText={"営業時間外"}
        onClick={undefined}
      />
    );
  }

  // 売り切れチェック
  const isSoldOut = data.menu.soldOutType != "onSale";
  if (isSoldOut) {
    return (
      <MenuDetailsPrimaryBottomButton
        buttonText={"売り切れ"}
        onClick={undefined}
      />
    );
  }

  // 提供時間かどうかのチェック
  let isServed: boolean = false;
  for (const categoryId of data.menu.categoryIds) {
    const isThisCategoryServed = checkIsServiceAvailable({
      category: searchCategory(data.categories, categoryId),
      currentDateTime: data.currentDateTime,
    });

    if (isThisCategoryServed) {
      isServed = true;
      break;
    }
  }

  if (!isServed) {
    return (
      <MenuDetailsPrimaryBottomButton
        buttonText={"営業時間外"}
        onClick={undefined}
      />
    );
  }

  // 放題プラン・コース料理でのチェック
  const isCallStaffMenu: boolean =
    data.menu.isUnLimitedPlan ||
    (data.menu.isSetPlan && data.menu.menuType == "plan");

  if (isCallStaffMenu) {
    return <MenuDetailsCallStaffButton data={data} />;
  }

  return <MenuDetailsAddCartButton data={data} />;
}
