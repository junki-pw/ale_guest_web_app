import { DocumentData } from "firebase/firestore";

export interface OrderChat {
  orderChatId: string;
  senderId: string;
  senderName: string;
  senderIcon: string;
  messageType: string;
  message: string | null;
  orderPaymentId: string | null;
  senderPosition: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const orderChatFromJson = (data: DocumentData): OrderChat => {
  return {
    orderChatId: data.orderChatId,
    senderId: data.senderId,
    senderName: data.senderName,
    senderIcon: data.senderIcon,
    messageType: data.messageType,
    message:
      data.message == undefined || data.message == null ? null : data.message,
    orderPaymentId:
      data.orderPaymentId == undefined || data.orderPaymentId == null
        ? null
        : data.orderPaymentId,
    senderPosition:
      data.senderPosition == undefined || data.senderPosition == null
        ? null
        : data.senderPosition,
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
