import { OrderCart } from "@/domain/order_cart";
import { ShopMenu } from "@/domain/shop_menu";
import { searchMenu } from "@/services/methods/search";
import Link from "next/link";
import { CheckoutState } from "../state";
import { convertOptionTexts } from "@/services/convert/option_text";

interface CheckoutNotServedMenuTile {
  orderCart: OrderCart;
  data: CheckoutState;
}

export default function CheckoutNotServedMenuTile({
  orderCart,
  data,
}: CheckoutNotServedMenuTile) {
  if (orderCart.serveStatus != "served") {
    return <div></div>;
  }

  const menu: ShopMenu = searchMenu(data.menus, orderCart.menuId);
  const optionTexts: string | null = convertOptionTexts({
    orderCart,
    menus: data.menus,
  });

  return (
    <Link href={"/"}>
      <div className="px-4 py-3">
        <h1 className="font-bold">
          {orderCart.customMenuName ?? menu.menuName}
        </h1>
        {optionTexts == null ? (
          <div></div>
        ) : (
          <p className="mt-1 text-xs text-gray-400">
            オプション , オプション , オプション , オプション , オプション
          </p>
        )}
      </div>
    </Link>
  );
}
