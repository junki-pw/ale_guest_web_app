import { DocumentData, FieldValue } from "firebase/firestore";

export interface OrderPayment {
  orderPaymentId: string;
  shopId: string;
  userId: string;
  orderRoomId: string;
  amount: number;
  appetizerAmount: number;
  coverChargeAmount: number;
  orderAmount: number;
  status: string;
  changeAmount: number | null;
  cashAmount: number | null;
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const orderPaymentFromJson = (data: DocumentData): OrderPayment => {
  return {
    orderPaymentId: data.orderPaymentId,
    shopId: data.shopId,
    userId: data.userId,
    orderRoomId: data.orderRoomId,
    amount: data.amount,
    appetizerAmount: data.appetizerAmount,
    coverChargeAmount: data.coverChargeAmount,
    orderAmount: data.orderAmount,
    status:
      data.status == undefined || data.status == null ? "request" : data.status,
    changeAmount:
      data.changeAmount == undefined || data.changeAmount == null
        ? null
        : data.changeAmount,
    cashAmount:
      data.cashAmount == undefined || data.cashAmount == null
        ? null
        : data.cashAmount,
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
