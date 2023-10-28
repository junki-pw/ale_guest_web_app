import { Shop } from "@/domain/shop";

export const convertIsReducedTaxRate: (shop: Shop) => boolean = (
  shop: Shop
) => {
  return shop.taxRateType == "eightPercent";
};
