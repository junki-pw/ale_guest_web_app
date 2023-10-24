import { DocumentData, FieldValue } from "firebase/firestore";

export interface ShopStaff {
  staffId: string;
  staffName: string;
  staffIcon: string;
  staffPosition: string;
  bio: string;
  isActive: boolean;
  isHidden: boolean;
  onWorking: boolean;
  userId: string | null;
  linkRedirectUrlId: string | null;
  timeCardId: string | null;
  linkedAt: Date | FieldValue | null;
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const shopStaffFromJson = (data: DocumentData): ShopStaff => {
  return {
    staffId: data.staffId,
    staffName: data.staffName,
    staffIcon: data.staffIcon,
    staffPosition: data.staffPosition,
    bio: data.bio == undefined || data.bio == null ? "" : data.bio,
    isActive:
      data.isActive == undefined || data.isActive == null
        ? true
        : data.isActive,
    isHidden:
      data.isHidden == undefined || data.isHidden == null
        ? false
        : data.isHidden,
    onWorking:
      data.onWorking == undefined || data.onWorking == null
        ? false
        : data.onWorking,
    userId:
      data.userId == undefined || data.userId == null ? null : data.userId,
    linkRedirectUrlId:
      data.linkRedirectUrlId == undefined || data.linkRedirectUrlId == null
        ? null
        : data.linkRedirectUrlId,
    timeCardId:
      data.timeCardId == undefined || data.timeCardId == null
        ? null
        : data.timeCardId,
    linkedAt:
      data.linkedAt == undefined || data.linkedAt == null
        ? null
        : data.linkedAt.toDate(),
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
