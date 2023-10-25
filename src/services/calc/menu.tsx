import { Shop } from "@/domain/shop";
import { ShopMenu } from "@/domain/shop_menu";
import { MenuOption } from "@/domain/shop_option";
import { calcMenuOptionsAmount } from "./option";
import { convertAmount, convertCorrects } from "../convert/number";

interface CalcMenuAmountProps {
  menu: ShopMenu;
  optionList: MenuOption[];
  options: {};
  orderCount: number;
  shop: Shop;
  isReducedTaxRate: boolean;
  discounts: [];
}

/// メニューの合計金額
/// 消費税が入ってない理由としてはそもそも内税を追加したため
/// 税抜きで計算できない仕様になっているから
export const calcMenuAmount = ({
  menu,
  optionList,
  options,
  orderCount,
  shop,
  isReducedTaxRate,
  discounts,
}: CalcMenuAmountProps) => {
  /// オプション料金を計算
  const menuOptionsAmount: number = calcMenuOptionsAmount({
    optionList: optionList,
    options: options,
    isReducedTaxRate: isReducedTaxRate,
    shop: shop,
  });

  /// メニューの合計金額を計算
  const menuAmount: number =
    menuOptionsAmount +
    convertAmount({
      amount: menu.price,
      externalTax: shop.externalTax,
      isReducedTaxRate: isReducedTaxRate,
    });

  return convertCorrects(orderCount * menuAmount, discounts);
};
