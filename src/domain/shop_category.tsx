import { DocumentData, FieldValue } from "firebase/firestore";

export interface ShopCategory {
  categoryId: string;
  categoryName: string;
  categoryCommonName: string;
  categoryDescription: string;
  isAlwaysVisible: boolean;
  serveTime: {};
  categoryIndex: number;
  isActive: boolean;
  menuIds: [];
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const shopCategoryFromJson = (data: DocumentData): ShopCategory => {
  return {
    categoryId: data.categoryId,
    categoryName: data.categoryName,
    categoryCommonName: data.categoryCommonName,
    categoryDescription: data.categoryDescription,
    isAlwaysVisible: data.isAlwaysVisible,
    serveTime: data.serveTime,
    categoryIndex:
      data.categoryIndex == undefined || data.categoryIndex == null
        ? 10000
        : data.categoryIndex,
    isActive:
      data.isActive == undefined || data.isActive == null
        ? true
        : data.isActive,
    menuIds:
      data.menuIds == undefined || data.menuIds == null ? [] : data.menuIds,
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
