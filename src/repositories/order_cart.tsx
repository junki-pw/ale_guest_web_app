import { doc_not_found } from "@/constants/error";
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
  doc,
  endAt,
  getCountFromServer,
  getDoc,
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

export const getOrderCartById = async (orderCartId: string) => {
  const d = doc(db, orderCartsCollection, orderCartId);

  return await getDoc(d).then((value) => {
    if (value.data() == null) {
      throw doc_not_found;
    }
    return orderCartFromJson(value.data()!);
  });
};

export const streamOrderCartsByOrderRoomId: (
  orderRoomId: string,
  onNext: (orderCarts: OrderCart[]) => void
) => Promise<void | Unsubscribe> = async (
  orderRoomId: string,
  onNext: (orderCarts: OrderCart[]) => void
) => {
  return await getQuery(orderRoomId).then((query) => {
    onSnapshot(query, async (snapshot) => {
      console.log("snapshot リッスン");

      // localからデータを全て取得する
      return onNext(await getLocalOrderCarts(orderRoomId));
    });
  });
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
      : mainQuery(orderRoomId, [endAt(value.docs[0])])
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

export const getOrderCartsContainedUnLimitedPlanById: (
  orderRoomId: string
) => Promise<OrderCart[]> = async (orderRoomId: string) => {
  const q = query(
    collectionRef(),
    where(isActive, "==", true),
    where("unLimitedPlanStartAt", "!=", null),
    where(kOrderRoomId, "==", orderRoomId)
  );

  return await getDocs(q).then((value) =>
    value.docs.map((e) => orderCartFromJson(e.data()))
  );
};
