import { AppUser, appUserFromJson } from "@/domain/user";
import { auth } from "@/providers/firebase";
import { streamCurrentUser } from "@/repositories/user";
import { useState, useEffect } from "react";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [initialUser, setInitialUser] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user != null && initialUser) {
        setInitialUser(false);
        // ユーザーを監視する
        streamCurrentUser((doc) => {
          if (doc.data() != null) {
            setCurrentUser(appUserFromJson(doc.data()!));
          }
        });
      }
    });
  });

  return { currentUser };
};
