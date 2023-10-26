import {
  desc,
  kOrderRoomId,
  orderChatsCollection,
  orderRoomsCollection,
} from "@/constants/firebase";
import { isDeleted, updatedAt } from "@/constants/keys";
import { OrderChat, orderChatFromJson } from "@/domain/order_chat";
import { db } from "@/providers/firebase";
import {
  DocumentData,
  Query,
  QueryConstraint,
  collection,
  endBefore,
  getDocs,
  getDocsFromCache,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const collectionRef = (orderRoomId: string) =>
  collection(db, orderRoomsCollection, orderRoomId, orderChatsCollection);

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
export const getOrderChats: (
  orderRoomId: string
) => Promise<OrderChat[]> = async (orderRoomId: string) =>
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
) => Promise<OrderChat[]> = async (orderRoomId: string) => {
  const q = mainQuery(orderRoomId, []);

  return getDocsFromCache(q).then((value) =>
    value.docs.map((e) => orderChatFromJson(e.data()))
  );
};
