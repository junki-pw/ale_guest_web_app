import { DocumentData, FieldValue } from "firebase/firestore";

export interface ShopMenu {
  menuId: string;
  menuCommonName: string;
  menuDescription: string;
  menuGenre: string;
  menuName: string;
  menuType: string;
  price: number;
  categoryIds: [];
  optionIds: [];
  soldOutType: string;
  defaultMenuCount: number;
  durationOfStayMinutes: number;
  lastOrderTimeMinutes: number;
  todayOrderedCount: number;
  isActive: boolean;
  isHidden: boolean;
  isLimited: boolean;
  isSetPlan: boolean;
  isUnLimitedPlan: boolean;
  planMenuIds: [];
  unLimitedMenuIds: [];
  menuImageUrl: string | null;
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const shopMenuFromJson = (data: DocumentData): ShopMenu => {
  return {
    menuId: data.menuId,
    menuCommonName: data.menuCommonName,
    menuDescription: data.menuDescription,
    menuGenre: data.menuGenre,
    menuName: data.menuName,
    menuType: data.menuType,
    price: data.price,
    categoryIds: data.categoryIds,
    optionIds: data.optionIds,
    soldOutType:
      data.soldOutType == undefined || data.soldOutType == null
        ? "onSale"
        : data.soldOutType,
    defaultMenuCount:
      data.defaultMenuCount == undefined || data.defaultMenuCount == null
        ? 20
        : data.defaultMenuCount,
    durationOfStayMinutes:
      data.durationOfStayMinutes == undefined ||
      data.durationOfStayMinutes == null
        ? 120
        : data.durationOfStayMinutes,
    lastOrderTimeMinutes:
      data.lastOrderTimeMinutes == undefined ||
      data.lastOrderTimeMinutes == null
        ? 30
        : data.lastOrderTimeMinutes,
    todayOrderedCount:
      data.todayOrderedCount == undefined || data.todayOrderedCount == null
        ? 0
        : data.todayOrderedCount,
    isActive:
      data.isActive == undefined || data.isActive == null
        ? true
        : data.isActive,
    isHidden:
      data.isHidden == undefined || data.isHidden == null
        ? false
        : data.isHidden,
    isLimited:
      data.isLimited == undefined || data.isLimited == null
        ? false
        : data.isLimited,
    isSetPlan:
      data.isSetPlan == undefined || data.isSetPlan == null
        ? true
        : data.isSetPlan,
    isUnLimitedPlan:
      data.isUnLimitedPlan == undefined || data.isUnLimitedPlan == null
        ? false
        : data.isUnLimitedPlan,
    planMenuIds:
      data.planMenuIds == undefined || data.planMenuIds == null
        ? []
        : data.planMenuIds,
    unLimitedMenuIds:
      data.unLimitedMenuIds == undefined || data.unLimitedMenuIds == null
        ? []
        : data.unLimitedMenuIds,
    menuImageUrl:
      data.menuImageUrl == undefined || data.menuImageUrl == null
        ? null
        : data.menuImageUrl,
    createdAt:
      data.createdAt == undefined || data.createdAt == null
        ? null
        : data.createdAt.toDate(),
    updatedAt:
      data.updatedAt == undefined || data.updatedAt == null
        ? null
        : data.updatedAt.toDate(),
  };
};
