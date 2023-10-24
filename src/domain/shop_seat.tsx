import { DocumentData, FieldValue } from "firebase/firestore";

export interface ShopSeat {
  seatId: string;
  seatName: string;
  seatCommonName: string;
  seatDescription: string;
  seatType: string;
  seatGenre: string;
  maxPeopleCount: number;
  minimumPeopleCount: number;
  seatImageUrls: [];
  isActive: boolean;
  isHidden: boolean;
  coverChargeId: string | null;
  orderRoomId: string | null;
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const shopSeatFromJson = (data: DocumentData): ShopSeat => {
  return {
    seatId: data.seatId,
    seatName: data.seatName,
    seatCommonName: data.seatCommonName,
    seatDescription: data.seatDescription,
    seatType: data.seatType,
    seatGenre: data.seatGenre,
    maxPeopleCount: data.maxPeopleCount,
    minimumPeopleCount: data.minimumPeopleCount,
    seatImageUrls: data.seatImageUrls,
    isActive:
      data.isActive == undefined || data.isActive == null
        ? true
        : data.isActive,
    isHidden:
      data.isHidden == undefined || data.isHidden == null
        ? false
        : data.isHidden,
    coverChargeId:
      data.coverChargeId == undefined || data.coverChargeId == null
        ? null
        : data.coverChargeId,
    orderRoomId:
      data.orderRoomId == undefined || data.orderRoomId == null
        ? null
        : data.orderRoomId,
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
