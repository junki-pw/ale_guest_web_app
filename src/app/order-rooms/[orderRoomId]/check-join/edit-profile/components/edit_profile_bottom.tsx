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
    const m: string = "このプロフィールアイコンと名前で参加しますか？";

    if (confirm(m)) {
      await joinOrderRoom({
        orderRoomId,
        userIcon: data.selectedImageUrl,
        userName: data.inputValue,
      })
        .then((value) => router.replace("/order-rooms/" + orderRoomId))
        .catch((e) => alert(e));
    }
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
