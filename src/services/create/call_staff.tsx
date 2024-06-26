import { CallStaff } from "@/domain/call_staff";
import { serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

interface CreateCallStaffProps {
  orderRoomId: string;
  shopId: string;
  seatCommonName: string;
  userId: string;
  userName: string;
  userIcon: string;
  message: string | null;
}

export function createCallStaff({
  orderRoomId,
  shopId,
  seatCommonName,
  userId,
  userName,
  userIcon,
  message,
}: CreateCallStaffProps): CallStaff {
  return {
    callStaffId: uuidv4(),
    status: "request",
    orderRoomId,
    shopId,
    seatCommonName,
    message: message ?? "",
    userId,
    userName,
    userIcon,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}
