import { DocumentData, FieldValue } from "firebase/firestore";

export interface NormalBH {
  normalBHId: string;
  dayWeek: string;
  openTime: number;
  endTime: number;
  isActive: boolean;
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const normalBHFromJson = (data: DocumentData): NormalBH => {
  return {
    normalBHId: data.normalBHId,
    dayWeek: data.dayWeek,
    openTime: data.openTime,
    endTime: data.endTime,
    isActive:
      data.isActive == undefined || data.isActive == null
        ? true
        : data.isActive,
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
