import {
  activeWhere,
  desc,
  optionsCollection,
  shopsCollection,
  updatedOrderBy,
} from "@/constants/firebase";
import { isActive, updatedAt } from "@/constants/keys";
import { MenuOption, menuOptionFromJson } from "@/domain/shop_option";
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

const collectionRef = (shopId: string) =>
  collection(db, shopsCollection, shopId, optionsCollection);

const mainQuery = (shopId: string, queryConstraint: QueryConstraint[]) =>
  query(collectionRef(shopId), orderBy(updatedAt, desc), ...queryConstraint);

/// 最新のアクティブなデータを全て取得する
/// キャッシュを活用するためデータ取得量はかなり控えめ
export const getOptions: (shopId: string) => Promise<MenuOption[]> = async (
  shopId: string
) =>
  await getQuery(shopId).then(
    async (query) =>
      await getDocs(query).then(async (value) => await getLocalOptions(shopId))
  );

const getQuery: (
  shopId: string
) => Promise<Query<DocumentData, DocumentData>> = async (shopId: string) => {
  const q = mainQuery(shopId, [limit(1)]);

  return getDocsFromCache(q).then((value) =>
    value.docs.length == 0
      ? mainQuery(shopId, [where(isActive, "==", true)])
      : mainQuery(shopId, [endAt(value.docs[0])])
  );
};

export const getLocalOptions: (
  shopId: string
) => Promise<MenuOption[]> = async (shopId: string) => {
  const q = mainQuery(shopId, [where(isActive, "==", true)]);

  return getDocsFromCache(q).then((value) =>
    value.docs.map((e) => menuOptionFromJson(e.data()))
  );
};
