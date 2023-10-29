import React from "react";
import Image from "next/image";
import { noImageUrl } from "@/constants/urls";
import { CheckJoinState } from "../state";

interface CheckJoinUsersPartProps {
  data: CheckJoinState;
}

export default function CheckJoinUsersPart({ data }: CheckJoinUsersPartProps) {
  const guestCount: number =
    data.orderRoom.womenCount +
    data.orderRoom.menCount +
    data.orderRoom.teenCount;

  return (
    <div>
      <h1 className="px-4 mb-0.5 font-bold text-gray-500">
        参加メンバー{guestCount}名
      </h1>
      {data.orderRoomUsers.map((user, index) => (
        <div key={index} className="px-4 py-1.5 flex items-center">
          <div className="relative h-9 w-9">
            <Image
              src={user.userIcon}
              alt={"user icon url"}
              fill
              className="rounded-full"
              sizes="h-9 w-9"
            ></Image>
          </div>
          <h2 className="ml-2 font-bold text-xs">{user.userName}</h2>
        </div>
      ))}
    </div>
  );
}
