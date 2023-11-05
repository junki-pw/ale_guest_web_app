"use client";

import React from "react";
import MenuDetailsBottom from "./components/menu_details_bottom";
import useSWR, { KeyedMutator } from "swr";
import { menuDetailsDetailsFetcher } from "./fetcher";
import MenuDetailsImagePart from "./components/menu_details_image_part";
import MenuDetailsTitleDescPart from "./components/title_desc_part";
import { MenuDetailsState } from "./state";
import { MenuDetailsOptionTiles } from "./components/option_tiles";
import MenuDetailsBody from "@/components/menu_details_body";

interface MenuDetailsProps {
  params: {
    orderRoomId: string;
    menuId: string;
  };
}

export default function MenuDetailsPage(props: MenuDetailsProps) {
  const orderRoomId = props.params.orderRoomId;
  const menuId = props.params.menuId;

  const { data, isLoading, error, mutate } = useSWR(
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

  return <MenuDetailsBody data={data} mutate={mutate} />;
}
