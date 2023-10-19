"use client";
import { auth } from "@/providers/firebase";
import { setUserId } from "firebase/analytics";
import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInAnonymously,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Sleep関数
// export function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export default function LoginPage() {
  const [uid, setUid] = useState<string | null | undefined>(null);
  const router = useRouter();
  const handleSignIn = async () => {
    try {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          signInAnonymously(auth).then((value) => {
            console.log("匿名認証成功: " + value.user?.uid);
            setUid(value.user.uid);
          });
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (e) {
      alert("エラーが発生しました");
    } finally {
    }
  };

  //   useEffect(() => {
  //     setUid(auth.currentUser?.uid);
  //     delay();
  //   }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUid(user?.uid);
    });
  }, []);

  const delay = async () => {
    // await sleep(3000);
    setUid(auth.currentUser?.uid);
    console.log("ログインページ2 uid: " + auth.currentUser?.uid);
  };

  console.log("ログインページ uid: " + auth.currentUser?.uid);

  //   useEffect(() => {
  //     router.push("/");
  //     //todo データを取得する
  //   }, []);

  //   if()

  if (uid == null) {
    return (
      <main className="p-4">
        <button
          className="bg-orange-400 p-4 rounded text-white"
          onClick={handleSignIn}
        >
          匿名認証ログイン
        </button>

        <div className="mb-4"></div>
        <button className="mt-4" onClick={delay}>
          データを取得する
        </button>
      </main>
    );
  }

  return (
    <main>
      <h1>firebaseUserId: {uid}</h1>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        画面遷移する
      </button>
    </main>
  );
}
