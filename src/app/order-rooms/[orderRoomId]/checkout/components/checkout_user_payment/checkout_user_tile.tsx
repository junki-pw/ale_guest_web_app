import React, { useState } from "react";
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
import { KeyedMutator } from "swr";

interface _CheckoutUsersProps {
  data: CheckoutState;
  mutate: KeyedMutator<CheckoutState>;
  orderRoomUser: OrderRoomUser;
}

export default function CheckoutUserTile({
  data,
  mutate,
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
  const amountPerPerson: number =
    data.checkoutType == "custom"
      ? (data.customAmount as any)[orderRoomUser.userId] ?? 0
      : calcCheckoutAmountPerPerson({
          amount: checkoutAmount,
          userId: orderRoomUser.userId,
          isHost: data.orderRoom.hostId == orderRoomUser.userId,
          userCount: userCount,
          customAmount: data.customAmount,
          checkoutType: data.checkoutType,
        });

  const [isSelected, setIsSelected] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function handleUpdateIsSelected() {
    setIsSelected(true);
  }

  function handleInputValueChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleUpdateCustomAmount() {
    setIsSelected(false);
    mutate(
      {
        ...data,
        customAmount: {
          ...data.customAmount,
          [`${orderRoomUser.userId}`]: inputValue.length == 0 ? 0 : inputValue,
        },
      },
      false
    );
  }

  return (
    <div className="flex w-full items-center px-4 py-1.5">
      {/* 画像 */}
      <Image
        className="rounded-full mr-1"
        src={orderRoomUser.userIcon}
        alt="order room user icon"
        height={32}
        width={32}
      ></Image>

      {isSelected ? (
        // TextField
        <input
          type="number"
          className="grow mr-3 border-2 rounded"
          value={inputValue}
          onChange={handleInputValueChanged}
        />
      ) : (
        // ユーザー名
        <h1 className="ml-1 mr-3 grow text-left truncate">
          {orderRoomUser.userName}
        </h1>
      )}

      {/* 料金 */}
      <h1 className="font-bold flex-none">
        ¥ {amountPerPerson.toLocaleString()}
      </h1>

      {/* 変更・保存 */}
      {data.checkoutType == "custom" && (
        <button
          className="ml-4 text-gray-400 flex-none"
          onClick={
            isSelected ? handleUpdateCustomAmount : handleUpdateIsSelected
          }
        >
          {isSelected ? "保存する" : "変更"}
        </button>
      )}
    </div>
  );
}
