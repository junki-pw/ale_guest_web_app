"use client";

import useSWR, { SWRConfig } from "swr";
import { auth } from "./firebase";
import { insertUserInfo } from "@/repositories/user";
import { signInAnonymously } from "firebase/auth";
import { useCurrentUser } from "@/hooks/current_user";

const initialFetcher = async () => {
  await auth.authStateReady();
  const userId = auth.currentUser?.uid;
  if (userId == undefined) {
    // 認証ていない場合は匿名認証を実行する
    await signInAnonymously(auth);
  }

  // user データを取得して、データが無い場合は新規作成
  await insertUserInfo();
};

const InitialProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, error } = useSWR("initial", initialFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  // currentUser を監視する処理
  // firebaseAuth の user がサインインした時に検知して自動で監視処理を発火させる
  const { currentUser } = useCurrentUser();

  if (isLoading || currentUser == null) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center pt-40">
        <h1>Loading...</h1>
      </div>
    );
  } else if (error) {
    return <div>{error}</div>;
  }

  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default InitialProvider;
