import {
  callStaffsCollection,
  orderRoomsCollection,
} from "@/constants/firebase";
import { CallStaff } from "@/domain/call_staff";
import { OrderRoom, orderRoomFromJson } from "@/domain/order_room";
import { AppUser } from "@/domain/user";
import { db } from "@/providers/firebase";
import { createCallStaff } from "@/services/create/call_staff";
import { doc, runTransaction, setDoc } from "firebase/firestore";

interface CallStaffFromOrderRoomProps {
  orderRoomId: string;
  shopId: string;
  seatCommonName: string;
  currentUser: AppUser;
  message: string | null;
}

export async function callStaffFromOrderRoom({
  orderRoomId,
  shopId,
  seatCommonName,
  currentUser,
  message,
}: CallStaffFromOrderRoomProps) {
  await runTransaction(db, async (t) => {
    const orderRoomDocRef = doc(db, orderRoomsCollection, orderRoomId);
    await t.get(orderRoomDocRef).then((value) => {
      const latestOrderRoom: OrderRoom = orderRoomFromJson(value.data()!);
      if (latestOrderRoom.isClosed) {
        throw Error("既に終了しているルームのため呼び出せませんでした");
      }
    });

    const callStaff: CallStaff = createCallStaff({
      orderRoomId,
      shopId,
      seatCommonName,
      userId: currentUser.userId,
      userName: currentUser.userName,
      userIcon: currentUser.userIcon,
      message: message,
    });

    const callStaffDocRef = doc(
      db,
      callStaffsCollection,
      callStaff.callStaffId
    );

    t.set(callStaffDocRef, callStaff);
  });
}
