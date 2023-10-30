import React, { useState } from "react";
import Image from "next/image";
import { CheckJoinEditProfileState } from "../state";

interface EditProfileIconsPartProps {
  data: CheckJoinEditProfileState;
}

export default function EditProfileIconsPart({
  data,
}: EditProfileIconsPartProps) {
  const [selectedImageUrl, setSelectedImageUrl] = useState(
    data.dummyShuffleImages[0]
  );

  function handleUpdateSelectedImageUrl(imageUrl: string) {
    setSelectedImageUrl(imageUrl);
  }

  return (
    <div className="flex flex-wrap px-4 w-full justify-center">
      {data.dummyShuffleImages.map((imageUrl, index) => {
        const isSelected: boolean = imageUrl == selectedImageUrl;
        return (
          <button
            key={index}
            className="relative h-[84px] w-[84px] mr-4 mb-4"
            onClick={() => handleUpdateSelectedImageUrl(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={"icon url"}
              fill
              className={`rounded-md ${
                isSelected ? "border-4 border-orange-400" : ""
              } `}
            ></Image>
          </button>
        );
      })}
    </div>
  );
}
