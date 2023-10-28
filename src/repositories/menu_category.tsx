import {
  categoriesCollection,
  desc,
  shopsCollection,
} from "@/constants/firebase";
import { updatedAt, isActive } from "@/constants/keys";
import { MenuCategory, menuCategoryFromJson } from "@/domain/menu_category";
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

const collectionRef = (shopId: string) =>
  collection(db, shopsCollection, shopId, categoriesCollection);

/// 最新のアクティブなデータを全て取得する
/// キャッシュを活用するためデータ取得量はかなり控えめ
export const getCategories: (
  shopId: string
) => Promise<MenuCategory[]> = async (shopId: string) =>
  await getQuery(shopId).then(
    async (query) =>
      await getDocs(query).then(
        async (value) => await getLocalCategories(shopId)
      )
  );

const getQuery: (
  shopId: string
) => Promise<Query<DocumentData, DocumentData>> = async (shopId: string) => {
  const previousQuery = (queryConstraint: QueryConstraint[]) =>
    query(collectionRef(shopId), orderBy(updatedAt, desc), ...queryConstraint);

  const q = previousQuery([limit(1)]);

  return getDocsFromCache(q).then((value) =>
    value.docs.length == 0
      ? previousQuery([where(isActive, "==", true)])
      : previousQuery([endBefore([updatedAt])])
  );
};

export const getLocalCategories: (
  shopId: string
) => Promise<MenuCategory[]> = async (shopId: string) => {
  const q = query(
    collectionRef(shopId),
    where(isActive, "==", true),
    orderBy(updatedAt, desc)
  );

  return getDocsFromCache(q).then((value) =>
    value.docs.map((e) => menuCategoryFromJson(e.data()))
  );
};
