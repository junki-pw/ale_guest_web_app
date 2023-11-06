"use client";

import React from "react";
import useSWR from "swr";
import { menuDetailsDetailsFetcher } from "./fetcher";
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
