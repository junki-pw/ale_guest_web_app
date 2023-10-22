import { OrderChat, orderChatFromJson } from "@/domain/order_chat";
import { OrderRoom, orderRoomFromJson } from "@/domain/order_room";
import { Shop, shopFromJson } from "@/domain/shop";
import { auth, db } from "@/providers/firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { OrderRoomState } from "./state";

export const orderRoomFetcher: (
  orderRoomId: string
) => Promise<OrderRoomState> = async (orderRoomId: string) => {
  const uid = auth.currentUser?.uid;
  if (uid == undefined) {
    throw "";
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
    throw "doc is null";
  } else if (orderRoom.isClosed) {
    throw "order room is closed";
  } else if ((orderRoom.userIds as any[]).indexOf(uid) == -1) {
    throw "user is not joined";
  }

  //todo Shop を取得
  const shopDocRef = doc(db, "shops", orderRoom.shopId);
  const shop: Shop | null = await getDoc(shopDocRef).then((value) =>
    value.data() == undefined ? null : shopFromJson(value.data()!)
  );
  if (shop == null) throw "shop is null";

  /// OrderChats 取得
  const q = query(collection(db, "order_chats"));
  const orderChats: OrderChat[] = await getDocs(q).then((qs) => {
    return qs.docs.map((doc) => orderChatFromJson(doc.data()));
  });

  /// unRead count を0にする

  return {
    orderRoom: orderRoom,
    shop: shop,
    orderChats: orderChats,
  };
};
