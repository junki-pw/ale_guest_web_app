"use client";
import { auth } from "@/providers/firebase";
import { User, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();
  const handleSignIn = async () => {
    try {
      signInAnonymously(auth).then((value) => {
        console.log("匿名認証成功: " + value.user?.uid);
        setCurrentUser(value.user);
      });
    } catch (e) {
      alert("エラーが発生しました");
    } finally {
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  console.log("ログインページ uid: " + auth.currentUser?.uid);

  if (currentUser == null) {
    return (
      <main className="p-4">
        <button
          className="bg-orange-400 p-4 rounded text-white"
          onClick={handleSignIn}
        >
          匿名認証ログイン
        </button>

        <div className="mb-4"></div>
      </main>
    );
  }

  return (
    <main>
      <h1>firebaseUserId: {currentUser.uid}</h1>
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
