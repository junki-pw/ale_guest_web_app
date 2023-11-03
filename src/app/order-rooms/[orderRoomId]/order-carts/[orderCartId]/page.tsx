"use client";
import React from "react";
import useSWR from "swr";
import { menuDetailsDetailsFetcher } from "../../menus/[menuId]/fetcher";
import { MenuDetailsState } from "../../menus/[menuId]/state";
import { MenuDetailsBody } from "../../menus/[menuId]/page";

interface OrderCartDetailsPageProps {
  params: {
    orderRoomId: string;
    orderCartId: string;
  };
}

export default function OrderCartDetailsPage(props: OrderCartDetailsPageProps) {
  const orderRoomId = props.params.orderRoomId;
  const orderCartId = props.params.orderCartId;
  const { data, isLoading, error, mutate } = useSWR<MenuDetailsState>(
    `order-rooms/${orderRoomId}/order-carts/${orderCartId}`,
    () =>
      menuDetailsDetailsFetcher({
        menuId: null,
        orderCartId,
        orderRoomId,
      })
  );

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error || data == undefined) {
    return <div>Error...</div>;
  }

  return <MenuDetailsBody data={data} mutate={mutate} />;
}
