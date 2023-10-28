import React from "react";
import Image from "next/image";
import { CheckoutState } from "../../state";
import { OrderRoomUser } from "@/domain/order_room_user";
import {
  calcCheckoutAmount,
  calcCheckoutAmountPerPerson,
} from "@/services/calc/checkout";
import { calcAppetizerAmount } from "@/services/calc/appetizer";
import { calcCoverChargeAmount } from "@/services/calc/cover_charge";
import { calcOrdersAmount } from "@/services/calc/order_cart";

interface _CheckoutUsersProps {
  data: CheckoutState;
  orderRoomUser: OrderRoomUser;
}

export default function CheckoutUserTile({
  data,
  orderRoomUser,
}: _CheckoutUsersProps) {
  const userCount: number = data.orderRoomUsers.filter(
    (element) => element.isActive
  ).length;

  // 人数
  const guestCount: number =
    data.orderRoom.womenCount +
    data.orderRoom.menCount +
    data.orderRoom.teenCount;

  // appetizer
  const appetizerAmount: number = calcAppetizerAmount({
    guestCount:
      data.orderRoom.womenCount +
      data.orderRoom.menCount +
      data.orderRoom.teenCount,
    shop: data.shop,
  });

  // order
  const orderedAmount: number = calcOrdersAmount({
    orderCarts: data.orderCarts,
    unLimitedMenuOrderCarts: data.orderCartsContainUnLimitedMenu,
    menus: data.menus,
    orderRoom: data.orderRoom,
    isOrdered: true,
    currentDateTime: data.currentDateTime,
  });

  // cover_charge
  const coverChargeAmount: number = calcCoverChargeAmount({
    coverCharge: data.coverCharge,
    orderedAmount,
    guestCount: guestCount,
    shop: data.shop,
    withTax: true,
  });

  // お会計の合計金額
  const checkoutAmount: number = calcCheckoutAmount({
    orderedAmount: orderedAmount,
    appetizerAmount: appetizerAmount,
    coverChargeAmount: coverChargeAmount,
    orderRoom: data.orderRoom,
  });

  // このユーザーのお会計金額
  const amountPerPerson: number = calcCheckoutAmountPerPerson({
    amount: checkoutAmount,
    userId: orderRoomUser.userId,
    isHost: data.orderRoom.hostId == orderRoomUser.userId,
    userCount: userCount,
    customAmount: data.customAmount,
    checkoutType: data.checkoutType,
  });

  return (
    <button className="flex w-full items-center px-4 py-1.5">
      <Image
        className="rounded-full mr-1"
        src={orderRoomUser.userIcon}
        alt=""
        height={32}
        width={32}
      ></Image>
      <h1 className="ml-1 mr-3 grow text-left">{orderRoomUser.userName}</h1>
      <h1 className="font-bold">¥ {amountPerPerson.toLocaleString()}</h1>
      {data.checkoutType == "custom" ? (
        <p className="ml-4 text-gray-400">変更</p>
      ) : (
        <div></div>
      )}
    </button>
  );
}
