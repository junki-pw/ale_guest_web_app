import { desc, kOrderRoomId, orderCartsCollection } from "@/constants/firebase";
import { updatedAt, isActive, isDeleted } from "@/constants/keys";
import { OrderCart, orderCartFromJson } from "@/domain/order_cart";
import { db } from "@/providers/firebase";
import {
  DocumentData,
  Query,
  QueryConstraint,
  Unsubscribe,
  collection,
  endBefore,
  getCountFromServer,
  getDocs,
  getDocsFromCache,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const collectionRef = () => collection(db, orderCartsCollection);

const mainQuery: (
  orderRoomId: string,
  queryConstraint: QueryConstraint[]
) => Query<DocumentData, DocumentData> = (
  orderRoomId: string,
  queryConstraint: QueryConstraint[]
) =>
  query(
    collectionRef(),
    where(kOrderRoomId, "==", orderRoomId),
    orderBy(updatedAt, desc),
    ...queryConstraint
  );

export const streamOrderCartsByOrderRoomId: (
  orderRoomId: string
) => Unsubscribe = (orderRoomId: string) => {
  const q = query(
    collection(db, "order_carts"),
    where("orderRoomId", "==", orderRoomId),
    orderBy("updatedAt", "desc")
  );

  return onSnapshot(q, (snapshot) => snapshot);
};

export const getOrderedCount: (orderRoomId: string) => Promise<number> = async (
  orderRoomId: string
) => {
  const query = mainQuery(orderRoomId, [where(isDeleted, "==", false)]);
  return await getCountFromServer(query).then((value) => value.data().count);
};

/// 最新のアクティブなデータを全て取得する
/// キャッシュを活用するためデータ取得量はかなり控えめ
export const getOrderCarts: (
  orderRoomId: string
) => Promise<OrderCart[]> = async (orderRoomId: string) =>
  await getQuery(orderRoomId).then(
    async (query) =>
      await getDocs(query).then(
        async (value) => await getLocalOrderCarts(orderRoomId)
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
      ? mainQuery(orderRoomId, [where(isDeleted, "==", false)])
      : mainQuery(orderRoomId, [endBefore([updatedAt])])
  );
};

export const getLocalOrderCarts: (
  orderRoomId: string
) => Promise<OrderCart[]> = async (orderRoomId: string) => {
  const q = mainQuery(orderRoomId, [where(isDeleted, "==", false)]);

  return getDocsFromCache(q).then((value) =>
    value.docs.map((e) => orderCartFromJson(e.data()))
  );
};
