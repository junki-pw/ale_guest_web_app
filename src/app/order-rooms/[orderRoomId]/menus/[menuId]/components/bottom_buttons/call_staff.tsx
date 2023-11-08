import React from "react";
import { MenuDetailsState } from "../../state";
import MenuDetailsPrimaryBottomButton from "./bottom_button";
import { callStaffFromOrderRoom } from "@/repositories/call_staff";
import { useCurrentUser } from "@/hooks/current_user";
import { getSeatById } from "@/repositories/shop_seat";
import { ShopSeat } from "@/domain/shop_seat";

interface MenuDetailsCallStaffButtonProps {
  data: MenuDetailsState;
}

export default function MenuDetailsCallStaffButton({
  data,
}: MenuDetailsCallStaffButtonProps) {
  const { currentUser } = useCurrentUser();

  async function _handleCallStaff() {
    const m = `${data.menu.menuName} を注文するために近くのスタッフを呼びますか？`;
    if (confirm(m)) {
      const seat: ShopSeat = await getSeatById(
        data.shop.shopId,
        data.orderRoom.seatId
      );

      // スタッフを呼ぶ処理を実行
      callStaffFromOrderRoom({
        orderRoomId: data.orderRoom.orderRoomId,
        shopId: data.orderRoom.shopId,
        seatCommonName: seat.seatCommonName,
        currentUser: currentUser!,
        message: data.menu.menuCommonName + "についてのご相談",
      })
        .then((value) => alert("近くのスタッフを呼びました"))
        .catch((e) => alert(e));
    }
  }

  return (
    <MenuDetailsPrimaryBottomButton
      buttonText={"スタッフを呼ぶ"}
      onClick={_handleCallStaff}
    />
  );
}
