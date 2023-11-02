import { OrderHistory } from "@/domain/order_history";
import { serverTimestamp } from "firebase/firestore";

interface createOrderHistoryProps {
  orderId: string;
  senderId: string;
  senderName: string;
  senderIcon: string;
  shopId: string;
}

export function createOrderHistory({
  orderId,
  senderId,
  senderName,
  senderIcon,
  shopId,
}: createOrderHistoryProps): OrderHistory {
  return {
    orderId: orderId,
    senderId: senderId,
    senderName: senderName,
    senderIcon: senderIcon,
    isPrinted: false,
    shopId: shopId,
    printedAt: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}
