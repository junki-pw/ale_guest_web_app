import React from "react";
import Image from "next/image";
import { noImageUrl } from "@/constants/urls";
import PrimaryQuantityButton from "@/primary/buttons/quantity_button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrderCartTile() {
  return (
    <div>
      <div className="px-4 py-3">
        <div className="flex mb-3 justify-between">
          <div className="block">
            <h1 className="font-bold text-base">
              メニュータイトルメニュータイトルメニュータイトルメニュータイトルメニュータイトルメニュータイトル
            </h1>
            <p className="my-1 text-sm">オプションテキスト</p>
            <p className="mt-0.5 text-orange-400">¥ 480</p>
          </div>
          <div className="relative h-24 w-32 rounded-md">
            <Image
              className="rounded-md"
              src={noImageUrl}
              alt={"メニュー画像"}
              fill
            ></Image>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <PrimaryQuantityButton
            addClicked={undefined}
            minusClicked={undefined}
            amount={0}
          />
          <div className="flex h-8 w-8 content-center items-center justify-center bg-gray-100 rounded-full">
            <FontAwesomeIcon
              icon={faTrash}
              className="h-[16px] text-gray-500"
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200 h-[0.5px]"></div>
    </div>
  );
}
