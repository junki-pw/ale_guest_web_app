import { doc_not_found } from "@/constants/error";
import { Shop, shopFromJson } from "@/domain/shop";
import { db } from "@/providers/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getShopById: (shopId: string) => Promise<Shop> = async (
  shopId: string
) => {
  const shopDocRef = doc(db, "shops", shopId);
  return await getDoc(shopDocRef).then((value) => {
    if (value.data() == undefined) {
      throw doc_not_found;
    }
    return shopFromJson(value.data()!);
  });
};
