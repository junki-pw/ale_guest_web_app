"use client";

import React from "react";
import MenuDetailsOptionTiles from "./components/option_tiles";
import MenuDetailsBottom from "./components/menu_details_bottom";
import useSWR from "swr";
import { menuDetailsDetailsFetcher } from "./fetcher";
import MenuDetailsImagePart from "./components/menu_details_image_part";
import MenuDetailsTitleDescPart from "./components/title_desc_part";

interface MenuDetailsProps {
  params: {
    orderRoomId: string;
    menuId: string;
  };
}

export default function MenuDetailsPage(props: MenuDetailsProps) {
  const orderRoomId = props.params.orderRoomId;
  const menuId = props.params.menuId;

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
    <main className="relative pt-4 pb-20">
      {/* 画像 */}
      <MenuDetailsImagePart data={data} />

      {/* メニュー名・説明・料金 */}
      <MenuDetailsTitleDescPart data={data} />

      {/* オプション */}
      {data.menu.optionIds.map((optionId, index) => (
        <MenuDetailsOptionTiles key={index} optionId={optionId} data={data} />
      ))}

      <MenuDetailsBottom data={data} />
    </main>
  );
}
