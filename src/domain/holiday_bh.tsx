import { DocumentData, FieldValue } from "firebase/firestore";

export interface HolidayBH {
  holidayBHId: string;
  isClosedAllDay: boolean;
  openAt: Date | FieldValue;
  endAt: Date | FieldValue;
  isActive: boolean;
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const holidayBHFromJson = (data: DocumentData): HolidayBH => {
  return {
    holidayBHId: data.holidayBHId,
    isClosedAllDay: data.isClosedAllDay,
    openAt: data.openAt.toDate(),
    endAt: data.endAt.toDate(),
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
