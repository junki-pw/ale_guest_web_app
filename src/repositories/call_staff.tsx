import { callStaffsCollection } from "@/constants/firebase";
import { CallStaff } from "@/domain/call_staff";
import { AppUser } from "@/domain/user";
import { db } from "@/providers/firebase";
import { createCallStaff } from "@/services/create/call_staff";
import { doc, setDoc } from "firebase/firestore";

interface CallStaffFromOrderRoomProps {
  orderRoomId: string;
  shopId: string;
  seatCommonName: string;
  currentUser: AppUser;
}

export async function callStaffFromOrderRoom({
  orderRoomId,
  shopId,
  seatCommonName,
  currentUser,
}: CallStaffFromOrderRoomProps) {
  const callStaff: CallStaff = createCallStaff({
    orderRoomId,
    shopId,
    seatCommonName,
    userId: currentUser.userId,
    userName: currentUser.userName,
    userIcon: currentUser.userIcon,
  });

  await setDoc(doc(db, callStaffsCollection, callStaff.callStaffId), callStaff);
}
