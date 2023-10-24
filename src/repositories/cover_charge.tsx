import { doc_not_found } from "@/constants/error";
import { CoverCharge, coverChargeFromJson } from "@/domain/cover_charge";
import { db } from "@/providers/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getCoverCharge: (shopId: string) => Promise<CoverCharge> = async (
  shopId: string
) => {
  return await getDoc(doc(db, "shops", shopId, "cover_charges")).then(
    (value) => {
      if (value.data() == undefined) {
        throw doc_not_found;
      }
      return coverChargeFromJson(value.data()!);
    }
  );
};
