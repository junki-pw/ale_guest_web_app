import { calcMenuAmount } from "@/services/calc/menu";
import React, { MouseEventHandler, useState } from "react";
import { MenuDetailsState } from "../state";
import { convertIsReducedTaxRate } from "@/services/convert/string";

interface MenuDetailsBottomProps {
  data: MenuDetailsState;
}

export default function MenuDetailsBottom({ data }: MenuDetailsBottomProps) {
  const [quantity, setQuantity] = useState(1);

  function decrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const amount: number = calcMenuAmount({
    menu: data.menu,
    optionList: data.options,
    options: data.selectedOptionMenus,
    orderCount: quantity,
    shop: data.shop,
    isReducedTaxRate: convertIsReducedTaxRate(data.shop),
    discounts: [],
  });

  return (
    <div className="fixed bottom-4 flex w-full px-4">
      <div className="flex h-[48px] items-center bg-orange-100 px-4 rounded-lg">
        <_Button isMinus={true} onClick={decrement} />
        <h1 className="w-[60px] text-center font-bold text-lg text-orange-500">
          {quantity}
        </h1>
        <_Button isMinus={false} onClick={() => setQuantity(quantity + 1)} />
      </div>
      <button className="ml-3 bg-orange-500 py-3 grow rounded-lg text-white font-bold">
        カートに追加・¥{amount.toLocaleString()}
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
