import {
  desc,
  orderHistoriesCollection,
  orderRoomsCollection,
} from "@/constants/firebase";
import { createdAt } from "@/constants/keys";
import { OrderHistory, orderHistoryFromJson } from "@/domain/order_history";
import { db } from "@/providers/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export const getOrderHistories: (
  orderRoomId: string
) => Promise<OrderHistory[]> = async (orderRoomId: string) => {
  const q = query(
    collection(db, orderRoomsCollection, orderRoomId, orderHistoriesCollection),
    orderBy(createdAt, desc)
  );

  return await getDocs(q).then((value) =>
    value.docs.map((e) => orderHistoryFromJson(e.data()))
  );
};
