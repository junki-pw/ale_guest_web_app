import React from "react";
import { MenuDetailsState } from "../../state";
import MenuDetailsPrimaryBottomButton from "./bottom_button";

interface MenuDetailsCallStaffButtonProps {
  data: MenuDetailsState;
}

export default function MenuDetailsCallStaffButton({
  data,
}: MenuDetailsCallStaffButtonProps) {
  function callStaff() {
    const m = `${data.menu.menuName} を注文するために近くの店員を呼びますか？`;
    if (confirm(m)) {
      // スタッフを呼ぶ処理を実行
    }
  }

  return (
    <MenuDetailsPrimaryBottomButton
      buttonText={"スタッフを呼ぶ"}
      onClick={callStaff}
    />
  );
}
