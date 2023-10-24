import { db } from "@/providers/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

export const getCurrentDateTime: () => Promise<Date> = async () => {
  return await addDoc(collection(db, "server_timestamps"), {
    createdAt: serverTimestamp(),
  }).then(async (value) => {
    return await getDoc(doc(db, "server_timestamps", value.id)).then((doc) =>
      doc.data() == null ? new Date() : doc.data()!["createdAt"]
    );
  });
};
