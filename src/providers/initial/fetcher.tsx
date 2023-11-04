import { insertUserInfo } from "@/repositories/user";
import { signInAnonymously } from "firebase/auth";
import { mutate } from "swr";
import { auth } from "../firebase";

export const initialFetcher = async () => {
  await auth.authStateReady();
  const userId = auth.currentUser?.uid;
  if (userId == undefined) {
    // 認証ていない場合は匿名認証を実行する
    await signInAnonymously(auth);
  }

  // user データを取得して、データが無い場合は新規作成
  await insertUserInfo();
};
