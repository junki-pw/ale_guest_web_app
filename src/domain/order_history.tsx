import { DocumentData, FieldValue } from "firebase/firestore";

export interface OrderHistory {
  orderId: string;
  senderId: string;
  senderName: string;
  senderIcon: string;
  isPrinted: boolean;
  shopId: string | null;
  printedAt: Date | FieldValue | null;
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const orderHistoryFromJson = (data: DocumentData): OrderHistory => {
  return {
    orderId: data.orderId,
    senderId: data.senderId,
    senderName: data.senderName,
    senderIcon: data.senderIcon,
    isPrinted:
      data.isPrinted == undefined || data.isPrinted == null
        ? false
        : data.isPrinted,
    shopId:
      data.shopId == undefined || data.shopId == null ? null : data.shopId,
    printedAt:
      data.printedAt == undefined || data.printedAt == null
        ? null
        : data.printedAt.toDate(),
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
