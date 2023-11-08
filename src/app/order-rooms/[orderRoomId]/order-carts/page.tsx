"use client";
import React from "react";
import OrderCartTile from "./components/order_cart_tile";
import useSWR from "swr";
import { orderCartFetcher } from "./fetcher";
import OrderCartBottom from "./components/order_cart_bottom";
import { OrderCartState } from "./state";
import { OrderCart } from "@/domain/order_cart";
import { useStreamOrderCartsById as useStreamOfOrderCartPage } from "./hooks";

interface OrderCartPageProps {
  params: {
    orderRoomId: string;
  };
}

export default function OrderCartPage(props: OrderCartPageProps) {
  const orderRoomId = props.params.orderRoomId;

  const { data, isLoading, error } = useSWR(
    `order-rooms/${orderRoomId}/order-carts`,
    () => orderCartFetcher(orderRoomId)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error || data == undefined) {
    return <div>Error...</div>;
  }

  return <_Body data={data} />;
}

interface _BodyProps {
  data: OrderCartState;
}

function _Body({ data }: _BodyProps) {
  // 監視処理
  useStreamOfOrderCartPage(data.orderRoom.orderRoomId);

  const orderCarts: OrderCart[] = [
    ...data.orderCarts.filter((element) => element.createdAt != null),
  ].sort((a, b) => (a.createdAt! < b.createdAt! ? 1 : -1));

  return (
    <div className="relative flex flex-col mb-[120px]">
      {orderCarts.map((orderCart) => (
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
