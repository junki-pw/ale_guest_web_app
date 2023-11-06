import { doc_not_found } from "@/constants/error";
import {
  orderRoomUsersCollection,
  orderRoomsCollection,
} from "@/constants/firebase";
import { OrderRoom, orderRoomFromJson } from "@/domain/order_room";
import { OrderRoomUser, orderRoomUserFromJson } from "@/domain/order_room_user";
import { auth, db } from "@/providers/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

const collectionRef = () => collection(db, orderRoomsCollection);
const docRef = (orderRoomId: string) =>
  doc(db, orderRoomsCollection, orderRoomId);

// order_room を取得する
export const getOrderRoomById: (
  orderRoomId: string
) => Promise<OrderRoom> = async (orderRoomId: string) => {
  const orderRoomDocRef = doc(db, "order_rooms", orderRoomId);
  return await getDoc(orderRoomDocRef).then((value) => {
    if (value.data() == undefined) {
      throw doc_not_found;
    }
    return orderRoomFromJson(value.data()!);
  });
};

interface joinOrderRoomProps {
  orderRoomId: string;
  userIcon: string;
  userName: string;
}

export async function joinOrderRoom({
  orderRoomId,
  userIcon,
  userName,
}: joinOrderRoomProps) {
  if (userName.length == 0) {
    throw "ユーザー名を設定して下さい";
  }

  await runTransaction(db, async (t) => {
    const userId = auth.currentUser!.uid;
    const orderRoomDocRef = docRef(orderRoomId);

    const latestOrderRoom: OrderRoom = await t
      .get(orderRoomDocRef)
      .then((value) => {
        if (value.data() == null) {
          throw doc_not_found;
        }
        return orderRoomFromJson(value.data()!);
      });

    if ((latestOrderRoom.userIds as any).includes(userId)) {
      throw "すでに参加しているためエラーが発生しました";
    } else if (latestOrderRoom.isClosed) {
      throw "すでに終了しているためエラーが発生しました";
    }

    const orderRoomUserDocRef = doc(
      db,
      orderRoomsCollection,
      orderRoomId,
      orderRoomUsersCollection,
      userId
    );
    const latestOrderRoomUser: OrderRoomUser | null = await t
      .get(orderRoomUserDocRef)
      .then((value) => {
        if (value.data() == null) {
          return null;
        }
        return orderRoomUserFromJson(value.data()!);
      });

    t.update(orderRoomDocRef, {
      userIds: arrayUnion(userId),
      hostId: latestOrderRoom.hostId ?? userId,
      updatedAt: serverTimestamp(),
    });

    if (latestOrderRoomUser == null) {
      // 新規作成
      const orderRoomUser: OrderRoomUser = {
        userId,
        userName,
        userIcon,
        unReadCount: 0,
        isActive: true,
        invitedUserId: null,
        invitedUserIcon: null,
        invitedUserName: null,
        inviteStatus: null,
        joinedAt: serverTimestamp(),
        rejectedAt: null,
        leftAt: null,
        lastReadAt: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      t.set(orderRoomUserDocRef, orderRoomUser);
    } else if (!latestOrderRoomUser.isActive) {
      // 退会から復活
      t.update(orderRoomUserDocRef, {
        userName,
        userIcon,
        isActive: true,
        updatedAt: serverTimestamp(),
      });
    }
  });
}
