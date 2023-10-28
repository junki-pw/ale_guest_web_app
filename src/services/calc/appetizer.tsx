import { Shop } from "@/domain/shop";
import { convertAmount } from "../convert/number";

interface AppetizerAmountProps {
  guestCount: number;
  shop: Shop;
}

export const calcAppetizerAmount: ({
  guestCount,
  shop,
}: AppetizerAmountProps) => number = ({
  guestCount,
  shop,
}: AppetizerAmountProps) => {
  return (
    convertAmount({
      amount: 12,
      externalTax: shop.externalTax,
      isReducedTaxRate: shop.taxRateType == "eightPercent",
    }) * guestCount
  );
};
