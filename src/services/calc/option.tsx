import { Shop } from "@/domain/shop";
import { MenuOption } from "@/domain/shop_option";
import { convertAmount } from "../convert/number";

interface CalcMenuOptionsAmountProps {
  optionList: MenuOption[];
  options: {};
  isReducedTaxRate: boolean;
  shop: Shop;
}

export const calcMenuOptionsAmount: ({
  optionList,
  options,
  isReducedTaxRate,
  shop,
}: CalcMenuOptionsAmountProps) => number = ({
  optionList,
  options,
  isReducedTaxRate,
  shop,
}: CalcMenuOptionsAmountProps) => {
  let amount = 0;
  for (const [key, value] of Object.entries(options)) {
    const menuOptionAmount: number = calcMenuOptionPrice({
      optionId: key,
      options: optionList,
      optionMenuIds: value as [],
      isReducedTaxRate: isReducedTaxRate,
      shop: shop,
    });
    amount = amount + menuOptionAmount;
  }
  return amount;
};

interface CalcMenuOptionPrice {
  optionId: string;
  options: MenuOption[];
  optionMenuIds: any[];
  isReducedTaxRate: boolean;
  shop: Shop;
}

/// メニューに含まれる1つ1つのオプション料金
export const calcMenuOptionPrice: ({
  optionId,
  options,
  optionMenuIds,
  isReducedTaxRate,
  shop,
}: CalcMenuOptionPrice) => number = ({
  optionId,
  options,
  optionMenuIds,
  isReducedTaxRate,
  shop,
}: CalcMenuOptionPrice) => {
  /// オプションデータのアクティブチェック
  const index = options.findIndex((element) => element.optionId == optionId);

  /// 非アクティブの場合は早期リターン
  if (index == -1) {
    return 0;
  }

  /// オプションの計算
  const option: MenuOption = options[index];

  return optionMenuIds.reduce(
    (previousValue: number, selectedMenuId: string): number => {
      const optionPrice: number = (option.menus as any)[selectedMenuId] ?? 0;
      return (
        previousValue +
        convertAmount({
          amount: optionPrice,
          externalTax: shop.externalTax,
          isReducedTaxRate: isReducedTaxRate,
        })
      );
    },
    0
  );
};
