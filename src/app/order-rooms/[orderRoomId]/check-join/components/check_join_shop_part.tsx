import React from "react";
import Image from "next/image";
import { noImageUrl } from "@/constants/urls";
import { CheckJoinState } from "../state";
import { Shop } from "@/domain/shop";

interface CheckJoinShopPartProps {
  data: CheckJoinState;
}

export default function CheckJoinShopPart({ data }: CheckJoinShopPartProps) {
  const shop: Shop = data.shop;
  return (
    <div>
      <h1 className="ml-4 text-sm text-gray-500 font-bold">お店について</h1>
      <div className="flex px-4 py-2 items-center">
        <div className="relative h-8 w-8 rounded-full">
          <Image
            src={shop.shopIcon}
            alt={"shop icon"}
            fill
            className="rounded-full"
          ></Image>
        </div>
        <div className="ml-4 block">
          <h1 className="font-bold">{shop.shopName}</h1>
          <p className="text-xs text-gray-400">
            {shop.prefecture}・{shop.city}
          </p>
        </div>
      </div>
    </div>
  );
}
