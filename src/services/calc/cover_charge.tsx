import { CoverCharge } from "@/domain/cover_charge";
import { Shop } from "@/domain/shop";
import { calcAppetizerAmount } from "./appetizer";
import { convertAmount } from "../convert/number";
import { convertIsReducedTaxRate } from "../convert/string";

interface CalcCoverChargeAmountProps {
  coverCharge: CoverCharge | null;
  orderedAmount: number;
  guestCount: number;
  shop: Shop;
  withTax: boolean;
}

export const calcCoverChargeAmount = ({
  coverCharge,
  orderedAmount,
  guestCount,
  shop,
  withTax,
}: CalcCoverChargeAmountProps) => {
  if (coverCharge == null) {
    return 0;
  }

  let coverChargeAmount = 0;

  /// 固定料金
  if (coverCharge.coverChargeType == "fixedFee") {
    coverChargeAmount =
      coverCharge.fixedFeeType == "perSeat"
        ? coverCharge.fixedFee ?? 0
        : (coverCharge.fixedFee ?? 0) * guestCount;
  } else {
    /// 以下はパーセント計算するための処理
    const appetizerAmount: number = shop.isServeAppetizer
      ? calcAppetizerAmount({ guestCount: guestCount, shop: shop })
      : 0;

    const amount: number = orderedAmount + appetizerAmount;

    /// パーセント
    coverChargeAmount = Math.floor((amount * (coverCharge.percent ?? 0)) / 100);
  }

  if (!withTax) {
    return coverChargeAmount;
  }

  return convertAmount({
    amount: coverChargeAmount,
    externalTax: shop.externalTax,
    isReducedTaxRate: convertIsReducedTaxRate(shop),
  });
};
