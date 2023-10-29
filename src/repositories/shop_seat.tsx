import { doc_not_found } from "@/constants/error";
import { seatsCollection, shopsCollection } from "@/constants/firebase";
import { ShopSeat, shopSeatFromJson } from "@/domain/shop_seat";
import { db } from "@/providers/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

const collectionRef = (shopId: string) =>
  collection(db, shopsCollection, shopId, seatsCollection);

export const getSeatById: (
  shopId: string,
  seatId: string
) => Promise<ShopSeat> = async (shopId: string, seatId: string) =>
  await getDoc(doc(db, shopsCollection, shopId, seatsCollection, seatId)).then(
    (value) => {
      if (value.data() == undefined) {
        throw doc_not_found;
      }
      return shopSeatFromJson(value.data()!);
    }
  );
