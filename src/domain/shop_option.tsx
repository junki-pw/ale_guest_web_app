import { DocumentData, FieldValue } from "firebase/firestore";

export interface ShopOption {
  optionId: string;
  optionName: string;
  optionDescription: string;
  maxSelectCount: number;
  isRequiredOption: boolean;
  defaultMenuIds: [];
  menus: {};
  isActive: boolean;
  optionMenuIds: [];
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const shopOptionFromJson = (data: DocumentData): ShopOption => {
  return {
    optionId: data.optionId,
    optionName: data.optionName,
    optionDescription: data.optionDescription,
    maxSelectCount: data.maxSelectCount,
    isRequiredOption: data.isRequiredOption,
    defaultMenuIds: data.defaultMenuIds,
    menus: data.menus,
    isActive:
      data.isActive == undefined || data.isActive == null
        ? true
        : data.isActive,
    optionMenuIds:
      data.optionMenuIds == undefined || data.optionMenuIds == null
        ? []
        : data.optionMenuIds,
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
