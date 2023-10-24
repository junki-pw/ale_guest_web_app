import { MenuCategory, menuCategoryFromJson } from "@/domain/menu_category";
import { db } from "@/providers/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getCategories: (
  shopId: string
) => Promise<MenuCategory[]> = async (shopId: string) => {
  const q = query(
    collection(db, "shops", shopId, "categories"),
    where("isActive", "==", true)
  );

  return getDocs(q).then((value) =>
    value.docs.map((e) => menuCategoryFromJson(e.data()))
  );
};
