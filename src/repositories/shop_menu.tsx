import { doc_not_found } from "@/constants/error";
import { ShopMenu, shopMenuFromJson } from "@/domain/shop_menu";
import { db } from "@/providers/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

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

export const getMenus: (shopId: string) => Promise<ShopMenu[]> = async (
  shopId: string
) => {
  const q = query(
    collection(db, "shops", shopId, "menus"),
    where("isActive", "==", true),
    where("isHidden", "==", false)
  );

  return await getDocs(q).then((value) =>
    value.docs.map((e) => shopMenuFromJson(e.data()))
  );
};
