import { DocumentData, FieldValue } from "firebase/firestore";

export interface UserIdenfier {
  userIdentifier: string;
  userId: string;
  userName: string;
  userIcon: string;
  isActive: boolean;
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const userIdenfierFromJson = (data: DocumentData): UserIdenfier => {
  return {
    userIdentifier: data.userIdentifier,
    userId: data.userId,
    userName: data.userName,
    userIcon: data.userIcon,
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
