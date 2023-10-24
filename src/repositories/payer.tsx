import { doc_not_found } from "@/constants/error";
import { Payer, payerFromJson } from "@/domain/payer";
import { db } from "@/providers/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getPayerById: (
  orderPaymentId: string,
  payerId: string
) => Promise<Payer> = async (orderPaymentId: string, payerId: string) => {
  const payerDocRef = doc(
    db,
    "order_payments",
    orderPaymentId,
    "payers",
    payerId
  );
  return await getDoc(payerDocRef).then((value) => {
    if (value.data() == undefined) {
      throw doc_not_found;
    }
    return payerFromJson(value.data()!);
  });
};