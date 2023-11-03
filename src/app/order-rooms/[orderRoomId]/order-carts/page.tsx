"use client";
import React, { useEffect } from "react";
import OrderCartTile from "./components/order_cart_tile";
import useSWR, { KeyedMutator, mutate } from "swr";
import { orderCartFetcher } from "./fetcher";
import { useOrderCartHooks } from "./hooks";
import OrderCartBottom from "./components/order_cart_bottom";
import { streamOrderCartsByOrderRoomId } from "@/repositories/order_cart";
import { OrderCartState } from "./state";
import { OrderCart } from "@/domain/order_cart";

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

  return <_Body data={data} mutate={mutate} />;
}

interface _BodyProps {
  data: OrderCartState;
  mutate: KeyedMutator<OrderCartState>;
}

function _Body({ data, mutate }: _BodyProps) {
  useEffect(() => {
    streamOrderCartsByOrderRoomId(data.orderRoom.orderRoomId, (orderCarts) => {
      mutate({ ...data, orderCarts: orderCarts }, false);
    });
  }, []);

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
