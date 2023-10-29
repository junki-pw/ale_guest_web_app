import { DocumentData } from "firebase/firestore";

export interface OrderRoom {
  orderRoomId: string;
  orderRoomName: string;
  orderRoomUrl: string;
  seatId: string;
  shopId: string;
  shopName: string;
  shopIcon: string;
  orderRoomNumber: number;
  menCount: number;
  womenCount: number;
  teenCount: number;
  orderRoomImageUrl: string;
  orderCartCount: number;
  isClosed: boolean;
  isDeleted: boolean;
  onOrder: boolean;
  corrects: [];
  userIds: [];
  courses: {};
  unLimitedPlans: {};
  coverChargeId: string |null;
  hostId: string | null;
  lastMessage: string | null;
  lastMessageType: string | null;
  orderPaymentId: string | null;
  reservationId: string | null;
  closedAt: Date | null;
  createdAt: Date | null;
  deletedAt: Date | null;
  updatedAt: Date | null;
}

export const orderRoomFromJson = (data: DocumentData): OrderRoom => {
  return {
    orderRoomId: data.orderRoomId,
    orderRoomName: data.orderRoomName,
    orderRoomUrl: data.orderRoomUrl,
    seatId: data.seatId,
    shopId: data.shopId,
    shopName: data.shopName,
    shopIcon: data.shopIcon,
    orderRoomNumber: data.orderRoomNumber,
    menCount: data.menCount,
    womenCount: data.womenCount,
    teenCount: data.teenCount,
    orderRoomImageUrl:
      data.orderRoomImageUrl == undefined || data.orderRoomImageUrl == null
        ? "https://firebasestorage.googleapis.com/v0/b/galapo-68a5a.appspot.com/o/other%2Fno-image-icon-v3.png?alt=media&token=bbe2d912-699e-4576-b036-303362c651ce"
        : data.orderRoomImageUrl,
    orderCartCount:
      data.orderCartCount == undefined || data.orderCartCount == null
        ? 0
        : data.orderCartCount,
    isClosed:
      data.isClosed == undefined || data.isClosed == null
        ? false
        : data.isClosed,
    isDeleted:
      data.isDeleted == undefined || data.isDeleted == null
        ? false
        : data.isDeleted,
    onOrder:
      data.onOrder == undefined || data.onOrder == null ? true : data.onOrder,
    corrects:
      data.corrects == undefined || data.corrects == null ? [] : data.corrects,
    userIds:
      data.userIds == undefined || data.userIds == null ? [] : data.userIds,
    courses:
      data.courses == undefined || data.courses == null ? {} : data.courses,
    unLimitedPlans:
      data.unLimitedPlans == undefined || data.unLimitedPlans == null
        ? {}
        : data.unLimitedPlans,
    coverChargeId:
      data.coverChargeId == undefined || data.coverChargeId == null
        ? null
        : data.coverChargeId,
    hostId:
      data.hostId == undefined || data.hostId == null ? null : data.hostId,
    lastMessage:
      data.lastMessage == undefined || data.lastMessage == null
        ? null
        : data.lastMessage,
    lastMessageType:
      data.lastMessageType == undefined || data.lastMessageType == null
        ? null
        : data.lastMessageType,
    orderPaymentId:
      data.orderPaymentId == undefined || data.orderPaymentId == null
        ? null
        : data.orderPaymentId,
    reservationId:
      data.reservationId == undefined || data.reservationId == null
        ? null
        : data.reservationId,
    closedAt:
      data.closedAt == undefined || data.closedAt == null
        ? null
        : data.closedAt.toDate(),
    createdAt:
      data.createdAt == undefined || data.createdAt == null
        ? null
        : data.createdAt.toDate(),
    deletedAt:
      data.deletedAt == undefined || data.deletedAt == null
        ? null
        : data.deletedAt.toDate(),
    updatedAt:
      data.updatedAt == undefined || data.updatedAt == null
        ? null
        : data.updatedAt.toDate(),
  };
};
