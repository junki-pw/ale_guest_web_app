import {
  desc,
  orderRoomUsersCollection,
  orderRoomsCollection,
} from "@/constants/firebase";
import { updatedAt } from "@/constants/keys";
import { OrderRoomUser, orderRoomUserFromJson } from "@/domain/order_room_user";
import { db } from "@/providers/firebase";
import {
  DocumentData,
  Query,
  QueryConstraint,
  collection,
  doc,
  endBefore,
  getDoc,
  getDocs,
  getDocsFromCache,
  limit,
  orderBy,
  query,
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

export const getOrderRoomUsers: (
  orderRoomId: string
) => Promise<OrderRoomUser[]> = async (orderRoomId: string) => {
  return await getDocs(
    query(collection(db, "order_rooms", orderRoomId, "order_room_users"))
  ).then((value) => {
    return value.docs.map((e) => orderRoomUserFromJson(e.data()));
  });
};

/// 最新のアクティブなデータを全て取得する
/// キャッシュを活用するためデータ取得量はかなり控えめ
export const getOrderChats: (
  orderRoomId: string
) => Promise<OrderRoomUser[]> = async (orderRoomId: string) =>
  await getQuery(orderRoomId).then(
    async (query) =>
      await getDocs(query).then(
        async (value) => await getLocalOrderChats(orderRoomId)
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
      ? mainQuery(orderRoomId, [])
      : mainQuery(orderRoomId, [endBefore([updatedAt])])
  );
};

export const getLocalOrderChats: (
  orderRoomId: string
) => Promise<OrderRoomUser[]> = async (orderRoomId: string) => {
  const q = mainQuery(orderRoomId, []);

  return getDocsFromCache(q).then((value) =>
    value.docs.map((e) => orderRoomUserFromJson(e.data()))
  );
};
