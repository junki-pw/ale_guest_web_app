import React from "react";
import Image from "next/image";
import { CheckJoinState } from "../state";

interface CheckJoinHeadPartProps {
  guestCount: number;
  data: CheckJoinState;
}

export default function CheckJoinHeadPart({
  guestCount,
  data,
}: CheckJoinHeadPartProps) {
  return (
    <nav className="flex flex-col justify-center items-center ">
      <Image
        src={data.orderRoom.orderRoomImageUrl}
        alt={"shop_icon_url"}
        width={72}
        height={72}
        className="my-6 rounded-full"
      ></Image>
      <div className="font-bold text-base text-gray-800 mb-2">
        {data.orderRoom.orderRoomName}
      </div>
      <div className="text-xs text-gray-600 text-center font-bold">
        メンバー {guestCount}・オーダー済み {data.orderRoom.orderCartCount}
      </div>
    </nav>
  );
}
