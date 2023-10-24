import { doc_not_found } from "@/constants/error";
import { OrderRoom, orderRoomFromJson } from "@/domain/order_room";
import { db } from "@/providers/firebase";
import { doc, getDoc } from "firebase/firestore";

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
