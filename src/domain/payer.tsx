import { DocumentData, FieldValue } from "firebase/firestore";

export interface Payer {
  payerId: string;
  payerIcon: string;
  payerName: string;
  amount: number;
  status: string;
  memo: string;
  changerId: string | null;
  cancelPaymentTransactionId: string | null;
  orderPaymentTransactionId: string | null;
  receiptUrl: string | null;
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const payerFromJson = (data: DocumentData): Payer => {
  return {
    payerId: data.payerId,
    payerIcon: data.payerIcon,
    payerName: data.payerName,
    amount: data.amount,
    status:
      data.status == undefined || data.status == null ? "request" : data.status,
    memo: data.memo == undefined || data.memo == null ? "" : data.memo,
    changerId:
      data.changerId == undefined || data.changerId == null
        ? null
        : data.changerId,
    cancelPaymentTransactionId:
      data.cancelPaymentTransactionId == undefined ||
      data.cancelPaymentTransactionId == null
        ? null
        : data.cancelPaymentTransactionId,
    orderPaymentTransactionId:
      data.orderPaymentTransactionId == undefined ||
      data.orderPaymentTransactionId == null
        ? null
        : data.orderPaymentTransactionId,
    receiptUrl:
      data.receiptUrl == undefined || data.receiptUrl == null
        ? null
        : data.receiptUrl,
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
