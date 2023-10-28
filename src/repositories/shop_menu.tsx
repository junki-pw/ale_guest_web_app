import { doc_not_found } from "@/constants/error";
import { desc, menusCollection, shopsCollection } from "@/constants/firebase";
import { updatedAt, isActive, isHidden } from "@/constants/keys";
import { ShopMenu, shopMenuFromJson } from "@/domain/shop_menu";
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
  where,
} from "firebase/firestore";

const collectionRef = (shopId: string) =>
  collection(db, shopsCollection, shopId, menusCollection);

export const getMenuById: (menuId: string) => Promise<ShopMenu> = async (
  menuId: string
) => {
  const docRef = doc(db, "shops", menuId);
  return await getDoc(docRef).then((value) => {
    if (value.data() == undefined) {
      throw doc_not_found;
    }
    return shopMenuFromJson(value.data()!);
  });
};

const mainQuery = (shopId: string, queryConstraint: QueryConstraint[]) =>
  query(collectionRef(shopId), orderBy(updatedAt, desc), ...queryConstraint);

/// 最新のアクティブなデータを全て取得する
/// キャッシュを活用するためデータ取得量はかなり控えめ
export const getMenus: (shopId: string) => Promise<ShopMenu[]> = async (
  shopId: string
) =>
  await getQuery(shopId).then(
    async (query) =>
      await getDocs(query).then(async (value) => await getLocalMenus(shopId))
  );

const getQuery: (
  shopId: string
) => Promise<Query<DocumentData, DocumentData>> = async (shopId: string) => {
  const q = mainQuery(shopId, [limit(1)]);

  return getDocsFromCache(q).then((value) =>
    value.docs.length == 0
      ? mainQuery(shopId, [
          where(isActive, "==", true),
          where(isHidden, "==", false),
        ])
      : mainQuery(shopId, [endBefore([updatedAt])])
  );
};

export const getLocalMenus: (shopId: string) => Promise<ShopMenu[]> = async (
  shopId: string
) => {
  const q = mainQuery(shopId, [
    where(isActive, "==", true),
    where(isHidden, "==", false),
  ]);

  return getDocsFromCache(q).then((value) =>
    value.docs.map((e) => shopMenuFromJson(e.data()))
  );
};
