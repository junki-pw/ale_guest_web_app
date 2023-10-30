import React from "react";
import Image from "next/image";
import { noImageUrl } from "@/constants/urls";

export default function EditProfileIconsPart() {
  const list = [1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div className="flex flex-wrap px-4 w-full justify-center">
      {list.map((e, index) => (
        <div key={index} className="relative h-[84px] w-[84px] mr-4 mb-4">
          <Image
            src={noImageUrl}
            alt={"icon url"}
            fill
            className={`rounded-md border-2 border-orange-400`}
          ></Image>
        </div>
      ))}
    </div>
  );
}
