import { DocumentData, FieldValue } from "firebase/firestore";

export interface CallStaff {
  callStaffId: string;
  status: string;
  orderRoomId: string;
  shopId: string;
  seatCommonName: string;
  message: string;
  userId: string;
  userName: string;
  userIcon: string;
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const callStaffFromJson = (data: DocumentData): CallStaff => {
  return {
    callStaffId: data.callStaffId,
    status: data.status,
    orderRoomId: data.orderRoomId,
    shopId: data.shopId,
    seatCommonName: data.seatCommonName,
    message: data.message,
    userId: data.userId,
    userName: data.userName,
    userIcon: data.userIcon,
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
