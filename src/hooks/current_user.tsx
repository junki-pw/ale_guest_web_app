import { usersCollection } from "@/constants/firebase";
import { AppUser, appUserFromJson } from "@/domain/user";
import { auth, db } from "@/providers/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import useSWRSubscription, { SWRSubscriptionOptions } from "swr/subscription";

export const useCurrentUser = () => {
  const { data, error } = useSWRSubscription(
    "currentUser",
    (key, { next }: SWRSubscriptionOptions<AppUser, any>) => {
      const uid: string | undefined = auth.currentUser?.uid;
      if (uid == undefined) {
        next("error 発生");
        return;
      }

      const d = doc(db, usersCollection, uid);
      const unSub = onSnapshot(d, (value) => {
        if (value.data() != null) {
          const user = appUserFromJson(value.data()!);
          console.log("userId リッスン: " + user.userId);
          next(null, user);
        } else {
          next("error 発生");
        }
      });

      return () => unSub && unSub();
    }
  );

  return { currentUser: data, error };
};
