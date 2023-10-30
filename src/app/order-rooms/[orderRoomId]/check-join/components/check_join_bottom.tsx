import { useRouter } from "next/navigation";
import React from "react";

interface CheckJoinBottomProps {
  orderRoomId: string;
}

export default function CheckJoinBottom({ orderRoomId }: CheckJoinBottomProps) {
  const router = useRouter();

  function handleGoToEditProfilePage() {
    router.push(`/order-rooms/${orderRoomId}/check-join/edit-profile`);
  }

  return (
    <div className="fixed bottom-0 px-4 py-3 w-full">
      <button
        className="font-bold text-white bg-orange-400 w-full py-3 rounded-md"
        onClick={handleGoToEditProfilePage}
      >
        新しいプロフィールで参加
      </button>
    </div>
  );
}
