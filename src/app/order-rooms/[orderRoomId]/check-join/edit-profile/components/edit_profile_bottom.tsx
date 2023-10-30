import { joinOrderRoom } from "@/repositories/order_room";
import { useRouter } from "next/navigation";
import React from "react";
import { CheckJoinEditProfileState } from "../state";

interface EditProfileBottomProps {
  orderRoomId: string;
  data: CheckJoinEditProfileState;
}

export default function EditProfileBottom({
  orderRoomId,
  data,
}: EditProfileBottomProps) {
  const router = useRouter();
  async function handleJoinOrderRoom() {
    await joinOrderRoom({
      orderRoomId,
      userIcon: data.selectedImageUrl,
      userName: data.inputValue,
    })
      .then((value) => router.replace("/order-rooms/" + orderRoomId)) // 画面遷移
      .catch((e) => alert(e)); // エラー処理
  }

  return (
    <div className="fixed bottom-0 px-4 py-3 w-full">
      <button
        className="w-full bg-orange-400 text-white py-3 rounded-md font-bold"
        onClick={handleJoinOrderRoom}
      >
        参加する
      </button>
    </div>
  );
}
