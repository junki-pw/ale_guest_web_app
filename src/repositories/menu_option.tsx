import { MenuCategory, menuCategoryFromJson } from "@/domain/menu_category";
import { MenuOption, menuOptionFromJson } from "@/domain/shop_option";
import { db } from "@/providers/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getOptions: (shopId: string) => Promise<MenuOption[]> = async (
  shopId: string
) => {
  const q = query(
    collection(db, "shops", shopId, "options"),
    where("isActive", "==", true)
  );

  return getDocs(q).then((value) =>
    value.docs.map((e) => menuOptionFromJson(e.data()))
  );
};
