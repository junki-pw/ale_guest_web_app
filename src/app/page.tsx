"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <h1>HPのホーム画面 今後はHPでありアプリであるようにする</h1>
      <button
        onClick={() => {
          router.push("/login");
        }}
      >
        ログインページに画面遷移
      </button>
    </main>
  );
}
