import { OrderCart } from "@/domain/order_cart";
import { CheckoutState } from "../../state";
import { ShopMenu } from "@/domain/shop_menu";
import { searchMenu } from "@/services/methods/search";
import { convertOptionTexts } from "@/services/convert/option_text";

interface _CheckoutMenuOptionTile {
  orderCart: OrderCart;
  data: CheckoutState;
}

export default function CheckoutMenuOptionTile({
  orderCart,
  data,
}: _CheckoutMenuOptionTile) {
  const menu: ShopMenu = searchMenu(data.menus, orderCart.menuId);

  const optionTexts = convertOptionTexts({ orderCart, menus: data.menus });

  return (
    <div className="flex justify-between items-center mb-3">
      <div>
        <h2>{menu.menuName}</h2>
        {optionTexts == null ? (
          <div></div>
        ) : (
          <p className="mt-1 text-xs text-gray-400">{optionTexts}</p>
        )}
      </div>
      <h1>¥ {(orderCart.orderedMenuAmount ?? 0).toLocaleString()}</h1>
    </div>
  );
}
