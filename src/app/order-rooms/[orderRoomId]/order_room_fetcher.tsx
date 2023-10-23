import { OrderChat, orderChatFromJson } from "@/domain/order_chat";
import { OrderRoom, orderRoomFromJson } from "@/domain/order_room";
import { Shop, shopFromJson } from "@/domain/shop";
import { auth, db } from "@/providers/firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { OrderRoomState } from "./state";
import {
  doc_not_found,
  order_room_closed,
  user_not_joined,
} from "@/constants/error";

export const orderRoomFetcher: (
  orderRoomId: string
) => Promise<OrderRoomState> = async (orderRoomId: string) => {
  console.log("orderRoomFetcher 発火");
  const uid = auth.currentUser?.uid;
  if (uid == undefined) {
    throw doc_not_found;
  }

  // order_room を取得する
  const orderRoomDocRef = doc(db, "order_rooms", orderRoomId);
  const orderRoom: OrderRoom | null = await getDoc(orderRoomDocRef).then(
    (value) =>
      value.data() == undefined ? null : orderRoomFromJson(value.data()!)
  );
  if (orderRoom == null) throw "orderRoom is null";

  // エラー処理
  if (orderRoom == null) {
    throw doc_not_found;
  } else if ((orderRoom.userIds as any[]).indexOf(uid) == -1) {
    if (orderRoom.isClosed) {
      throw order_room_closed;
    }
    throw user_not_joined;
  }

  //todo Shop を取得
  const shopDocRef = doc(db, "shops", orderRoom.shopId);
  const shop: Shop | null = await getDoc(shopDocRef).then((value) =>
    value.data() == undefined ? null : shopFromJson(value.data()!)
  );
  if (shop == null) {
    throw doc_not_found;
  }

  /// OrderChats 取得
  const q = query(collection(db, "order_rooms", orderRoomId, "order_chats"));
  const orderChats: OrderChat[] = await getDocs(q).then((qs) => {
    return qs.docs.map((doc) => orderChatFromJson(doc.data()));
  });

  console.log("orderChats length: " + orderChats.length);

  /// unRead count を0にする

  return {
    orderRoom: orderRoom,
    shop: shop,
    orderChats: orderChats,
  };
};
