import { doc_not_found } from "@/constants/error";
import {
  coverChargeCollection as coverChargesCollection,
  shopsCollection,
} from "@/constants/firebase";
import { CoverCharge, coverChargeFromJson } from "@/domain/cover_charge";
import { db } from "@/providers/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

const collectionRef = (shopId: string) =>
  collection(db, shopsCollection, shopId, coverChargesCollection);

export const getCoverChargeById: (
  shopId: string,
  coverChargeId: string
) => Promise<CoverCharge> = async (shopId: string, coverChargeId: string) =>
  await getDoc(
    doc(db, shopsCollection, shopId, coverChargesCollection, coverChargeId)
  ).then((value) => {
    if (value.data() == undefined) {
      throw doc_not_found;
    }
    return coverChargeFromJson(value.data()!);
  });
