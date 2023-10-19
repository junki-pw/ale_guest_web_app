"use client";
import { auth } from "@/providers/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("firebaseUser: " + user?.uid);
      setFirebaseUser(user);
    });

    goToLoginPage();
  });

  const goToLoginPage = async () => {
    // 2.0秒待ってからデータが無い場合はログイン画面に飛ばす
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // auth.currentUser?.uid に設定している理由：
    // firebaseUser は更新されたとしても過去のデータを持つから
    // なお firebaseUser で if 文を作るとエラーになる
    if (auth.currentUser?.uid == undefined) {
      console.log("ログインページに画面遷移");
      router.replace("/login");
    } else {
      //todo ここで atom に対して本当の currentUser データを追加と監視する処理を記入する
    }
  };

  if (auth.currentUser?.uid != undefined) {
    return (
      <main>
        <h1>firebaseUser: {auth.currentUser.uid}</h1>
        <div className="flex flex-col">
          <button
            onClick={() => {
              router.push("/login");
            }}
          >
            ログインページに画面遷移
          </button>
          <button
            onClick={() => {
              signOut(auth);
            }}
          >
            ログアウト
          </button>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main>
        <h1>Loading...</h1>
        <button
          onClick={() => {
            router.replace("/login");
          }}
        >
          ログイン画面へ遷移する
        </button>
      </main>
    );
  }

  return (
    <main>
      <h1>HPのホーム画面 今後はHPでありアプリであるようにする</h1>
      <button
        onClick={() => {
          router.replace("/login");
        }}
      >
        ログインページに画面遷移
      </button>
    </main>
  );
}
