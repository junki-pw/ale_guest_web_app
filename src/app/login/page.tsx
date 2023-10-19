"use client";
import { auth } from "@/providers/firebase";
import { signInAnonymously } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [uid, setUid] = useState<string | null>(null);
  const router = useRouter();
  const handleSignIn = async () => {
    try {
      await signInAnonymously(auth).then((value) => {
        console.log("匿名認証成功: " + value.user?.uid);
        setUid(value.user.uid);
      });
    } catch (e) {
      alert("エラーが発生しました");
    } finally {
    }
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
      </main>
    );
  }

  return (
    <main>
      <h1>firebaseUserId: {uid}</h1>
    </main>
  );
}
