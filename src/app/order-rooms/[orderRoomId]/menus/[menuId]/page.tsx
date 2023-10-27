"use client";

import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";
import OptionTile from "./components/option_tile";
import MenuDetailsBottom from "./components/menu_details_bottom";
import useSWR from "swr";
import { menuDetailsDetailsFetcher } from "./fetcher";
import { menuNoImageUrl } from "@/constants/urls";

interface MenuDetailsProps {
  params: {
    orderRoomId: string;
    menuId: string;
  };
}

export default function MenuDetailsPage(props: MenuDetailsProps) {
  const orderRoomId = props.params.orderRoomId;
  const menuId = props.params.menuId;

  const [width] = useWindowSize();
  const imageWidth = width - 32;

  const { data, isLoading, error } = useSWR(
    `order-rooms/${orderRoomId}/menus/${menuId}`,
    () =>
      menuDetailsDetailsFetcher({
        orderRoomId,
        menuId,
        orderCartId: null,
      })
  );

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error || data == undefined) {
    return <div>Error...</div>;
  }

  return (
    <main className="relative h-full pt-4 pb-20">
      <div className="flex flex-col items-center">
        <div className="relative inline-block overflow-hidden h-fit w-full px-4">
          <Image
            src={data.menu.menuImageUrl ?? menuNoImageUrl}
            alt="menu details image"
            width={imageWidth}
            height={imageWidth}
            priority
          ></Image>
        </div>
        <div className="w-full px-4">
          <h1 className="mt-4 font-bold ">{data.menu.menuName}</h1>
          <p className="mb-3 mt-1 text-gray-400 text-xs">
            {data.menu.menuDescription}
          </p>
          <h2 className="mb-4 text-xl text-orange-500 font-bold">
            ¥ {data.menu.price}
          </h2>
        </div>
      </div>

      {data.menu.optionIds.map((e) => (
        <OptionTile key={e} optionId={e} data={data} />
      ))}

      <MenuDetailsBottom />
    </main>
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
