import React from "react";
import useSWR from "swr";
import { CheckoutState } from "../../state";

interface _CheckoutTypeButtonProps {
  checkoutType: string;
  data: CheckoutState;
}

export default function CheckoutTypes({
  checkoutType,
  data,
}: _CheckoutTypeButtonProps) {
  let label = "割り勘";
  let isSelected: boolean = data.checkoutType == checkoutType;

  const { mutate } = useSWR<CheckoutState>(
    `order-rooms/${data.orderRoom.orderRoomId}/checkout`
  );

  switch (checkoutType) {
    case "splitBil":
      label = "割り勘";
      break;
    case "host":
      label = "ホストが全て払う";
      break;
    default:
      label = "カスタム";
  }

  const handleUpdateCheckoutType = () => {
    mutate({ ...data, checkoutType: checkoutType }, false);
  };

  return (
    <button
      className={`
        py-1.5 px-3 mr-2 rounded-md
        ${isSelected ? "bg-orange-500" : "bg-gray-100"} 
        ${isSelected ? "text-white" : "text-gray-400"}
        `}
      onClick={handleUpdateCheckoutType}
    >
      {label}
    </button>
  );
}
