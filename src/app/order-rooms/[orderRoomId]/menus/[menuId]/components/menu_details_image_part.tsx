import React, { useLayoutEffect, useState } from "react";
import Image from "next/image";
import { MenuDetailsState } from "../state";
import { menuNoImageUrl } from "@/constants/urls";

interface MenuDetailsImagePartProps {
  data: MenuDetailsState;
}

export default function MenuDetailsImagePart({
  data,
}: MenuDetailsImagePartProps) {
  const [width] = useWindowSize();
  const imageWidth = width - 32;

  if (data.menu.menuImageUrl == null) {
    return <div></div>;
  }

  return (
    <div className="relative inline-block overflow-hidden h-fit w-full px-4 mb-4">
      <Image
        src={data.menu.menuImageUrl ?? menuNoImageUrl}
        alt="menu details image"
        className="rounded-md"
        width={imageWidth}
        height={imageWidth}
        priority
      ></Image>
    </div>
  );
}

const useWindowSize = (): number[] => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};
