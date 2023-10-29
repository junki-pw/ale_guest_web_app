"use client";
import React from "react";
import OrderCartTile from "./components/order_cart_tile";
import useSWR from "swr";
import { orderCartFetcher } from "./fetcher";
import { useOrderCartHooks } from "./hooks";
import OrderCartBottom from "./components/order_cart_bottom";

interface OrderCartPageProps {
  params: {
    orderRoomId: string;
  };
}
export default function OrderCartPage(props: OrderCartPageProps) {
  const orderRoomId = props.params.orderRoomId;

  const { data, isLoading, error, mutate } = useSWR(
    `order-rooms/${orderRoomId}/order-carts`,
    () => orderCartFetcher(orderRoomId)
  );
  const { test } = useOrderCartHooks({ mutate, data });

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error || data == undefined) {
    return <div>Error...</div>;
  }

  return (
    <div className="relative flex flex-col mb-[120px]">
      {data.orderCarts.map((orderCart) => (
        <OrderCartTile
          key={orderCart.orderCartId}
          orderCart={orderCart}
          data={data}
        />
      ))}

      <OrderCartBottom data={data} />
    </div>
  );
}
