import { OrderCart } from "@/domain/order_cart";
import React from "react";
import { OrderHistoriesState } from "../state";
import { searchMenu } from "@/services/methods/search";
import { ShopMenu } from "@/domain/shop_menu";
import { convertOptionTexts } from "@/services/convert/option_text";

interface OrderHistoryCartTileProps {
  orderCart: OrderCart;
  data: OrderHistoriesState;
}

export default function OrderHistoryCartTile({
  orderCart,
  data,
}: OrderHistoryCartTileProps) {
  const menu: ShopMenu = searchMenu(data.menus, orderCart.menuId);
  const optionTexts: string | null = convertOptionTexts({
    orderCart,
    menus: data.menus,
  });

  return (
    <button className="px-4 py-3 w-full text-left">
      <h1 className="text-md font-bold">
        {orderCart.customMenuName ?? menu.menuName}
      </h1>
      {optionTexts == null ? (
        <div></div>
      ) : (
        <p className="mt-1 text-xs text-gray-400">{optionTexts}</p>
      )}
      <div className="mt-2 flex justify-between">
        <p className="text-orange-400">
          ¥ {orderCart.orderedMenuAmount?.toLocaleString()}
        </p>
        <p className="text-gray-400">
          {orderCart.serveStatus == "served" ? "配膳済み" : "未配膳"}
        </p>
      </div>
    </button>
  );
}
