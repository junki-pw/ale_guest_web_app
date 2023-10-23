"use client";

import useSWR, { SWRConfig } from "swr";
import { auth } from "./firebase";
import { insertUserInfo } from "@/api/insertUserInfo";
import { signInAnonymously } from "firebase/auth";

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
  const { isLoading, error } = useSWR("initial", initialFetcher);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center pt-40">
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
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default InitialProvider;
