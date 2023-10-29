import React from "react";
import Image from "next/image";
import { noImageUrl } from "@/constants/urls";
import { CheckJoinState } from "../state";
import { ShopSeat } from "@/domain/shop_seat";

interface CheckJoinSeatPartProps {
  data: CheckJoinState;
}

export default function CheckJoinSeatPart({ data }: CheckJoinSeatPartProps) {
  const seat: ShopSeat = data.seat;
  return (
    <div>
      <div className="px-4 mb-3">
        <h1 className="text-sm font-bold text-gray-500 mb-2">お店について</h1>
        <p className="text-xs text-gray-400">{seat.seatDescription}</p>
      </div>
      <div className="flex">
        {seat.seatImageUrls.map((imageUrl, index) => (
          <div
            key={index}
            className={`relative h-16 w-16 mr-1.5 ${index == 0 ? "ml-4" : ""}`}
          >
            <Image
              src={imageUrl}
              alt={"seat image url"}
              fill
              className="rounded-md"
            ></Image>
          </div>
        ))}
      </div>
    </div>
  );
}
