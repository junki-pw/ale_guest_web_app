import React from "react";
import { CheckoutState } from "../state";
import CheckoutMenuOptionTile from "./checkout_orders/checkout_order_menu_option_tile";
import { calcCheckoutAmount } from "@/services/calc/checkout";
import { calcAppetizerAmount } from "@/services/calc/appetizer";
import { calcOrdersAmount } from "@/services/calc/order_cart";
import { calcCoverChargeAmount } from "@/services/calc/cover_charge";

interface _CheckoutOrdersPart {
  data: CheckoutState;
}

export default function CheckoutOrdersPart({ data }: _CheckoutOrdersPart) {
  const guestCount: number =
    data.orderRoom.womenCount +
    data.orderRoom.menCount +
    data.orderRoom.teenCount;

  const appetizerAmount: number = calcAppetizerAmount({
    guestCount,
    shop: data.shop,
  });

  const orderedAmount: number = calcOrdersAmount({
    orderCarts: data.orderCarts,
    unLimitedMenuOrderCarts: data.orderCartsContainUnLimitedMenu,
    menus: data.menus,
    orderRoom: data.orderRoom,
    isOrdered: true,
    currentDateTime: data.currentDateTime,
  });

  const coverChargeAmount: number = calcCoverChargeAmount({
    coverCharge: data.coverCharge,
    orderedAmount,
    guestCount,
    shop: data.shop,
    withTax: true,
  });

  const checkoutAmount: number = calcCheckoutAmount({
    orderedAmount,
    appetizerAmount,
    coverChargeAmount,
    orderRoom: data.orderRoom,
  });

  const coverChargeDesc: string =
    data.coverCharge?.coverChargeType == "fixedFee"
      ? data.coverCharge.fixedFeeType == "perTable"
        ? "× 1席"
        : "× $guestCount名"
      : "（${coverCharge.percent ?? 0}%）";

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1>お会計</h1>
        <button className="text-ms">詳細を確認する ▶︎</button>
      </div>

      {/* カート一覧 */}
      {data.orderCarts.map((orderCart) => (
        <CheckoutMenuOptionTile
          key={orderCart.orderCartId}
          orderCart={orderCart}
          data={data}
        />
      ))}

      {/* 突き出し料金 */}
      {data.shop.isServeAppetizer && (
        <_Tile
          title={data.shop.appetizerName}
          desc={guestCount.toString()}
          amount={appetizerAmount}
          amountText={null}
          textColor={null}
        />
      )}

      {/* テーブルチャージ */}
      {data.coverCharge != null && (
        <_Tile
          title={data.coverCharge!.coverChargeName}
          desc={coverChargeDesc}
          amount={coverChargeAmount}
          amountText={null}
          textColor={null}
        />
      )}

      {/* 割引・割り増しを追加する */}
      {data.orderRoom.corrects.map((correct, index) => {
        const type: string = correct["type"] ?? "savings";
        const isSavings = type == "savings";
        const savings: number = correct["savings"] ?? 0;
        const percent: number = correct["percent"] ?? 0;
        const isPlus = isSavings ? savings >= 0 : percent >= 0;

        return (
          <_Tile
            key={index}
            title={isPlus ? "割り増し" : "割引"}
            desc={""}
            amount={null}
            amountText={
              isSavings ? savings.toLocaleString() : correct["percent"] + "%"
            }
            textColor={isPlus ? null : "text-orange-500"}
          />
        );
      })}

      <div className="mt-1 mb-2 h-[1px] bg-gray-200 w-full"></div>
      <div className="flex justify-between">
        <h1 className="font-bold">お会計</h1>
        <h1 className="font-bold">¥ {checkoutAmount.toLocaleString()}</h1>
      </div>
    </div>
  );
}

interface _Tile {
  title: string;
  desc: string;
  amount: number | null;
  amountText: string | null;
  textColor: string | null;
}

const _Tile = ({ title, desc, amount, amountText, textColor }: _Tile) => {
  return (
    <div className="mb-3 flex w-full">
      <p className={`grow truncate ${textColor == null ? "" : textColor}`}>
        {title} {desc}
      </p>
      <p className={`flex-none ${textColor == null ? "" : textColor}`}>
        {amountText ?? "¥" + `${(amount ?? 0).toLocaleString()}`}
      </p>
    </div>
  );
};
