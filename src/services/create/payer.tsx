import { Payer } from "@/domain/payer";
import { serverTimestamp } from "firebase/firestore";

interface CreatePayerProps {
  payerId: string;
  payerIcon: string;
  payerName: string;
  amount: number;
  status: string;
}

export function createPayer({
  payerId,
  payerIcon,
  payerName,
  amount,
  status,
}: CreatePayerProps): Payer {
  return {
    payerId: payerId,
    payerIcon: payerIcon,
    payerName: payerName,
    amount: amount,
    status: status,
    memo: "",
    changerId: null,
    cancelPaymentTransactionId: null,
    orderPaymentTransactionId: null,
    receiptUrl: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}
