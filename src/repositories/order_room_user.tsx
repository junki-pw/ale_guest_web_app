import {
  desc,
  orderRoomUsersCollection,
  orderRoomsCollection,
} from "@/constants/firebase";
import { isActive, updatedAt } from "@/constants/keys";
import { OrderRoomUser, orderRoomUserFromJson } from "@/domain/order_room_user";
import { db } from "@/providers/firebase";
import {
  DocumentData,
  Query,
  QueryConstraint,
  collection,
  endAt,
  getDocs,
  getDocsFromCache,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const collectionRef = (orderRoomId: string) =>
  collection(db, orderRoomsCollection, orderRoomId, orderRoomUsersCollection);

const mainQuery: (
  orderRoomId: string,
  queryConstraint: QueryConstraint[]
) => Query<DocumentData, DocumentData> = (
  orderRoomId: string,
  queryConstraint: QueryConstraint[]
) =>
  query(
    collectionRef(orderRoomId),
    orderBy(updatedAt, desc),
    ...queryConstraint
  );

/// 最新のアクティブなデータを全て取得する
/// キャッシュを活用するためデータ取得量はかなり控えめ
export const getOrderRoomUsers: (
  orderRoomId: string
) => Promise<OrderRoomUser[]> = async (orderRoomId: string) =>
  await getQuery(orderRoomId).then(
    async (query) =>
      await getDocs(query).then(
        async (value) => await getLocalOrderRoomUsers(orderRoomId)
      )
  );

const getQuery: (
  orderRoomId: string
) => Promise<Query<DocumentData, DocumentData>> = async (
  orderRoomId: string
) => {
  const q = mainQuery(orderRoomId, [limit(1)]);

  return getDocsFromCache(q).then((value) =>
    value.docs.length == 0
      ? mainQuery(orderRoomId, [where(isActive, "==", true)])
      : mainQuery(orderRoomId, [endAt(value.docs[0])])
  );
};

export const getLocalOrderRoomUsers: (
  orderRoomId: string
) => Promise<OrderRoomUser[]> = async (orderRoomId: string) => {
  const q = mainQuery(orderRoomId, [where(isActive, "==", true)]);

  return getDocsFromCache(q).then((value) =>
    value.docs.map((e) => orderRoomUserFromJson(e.data()))
  );
};
