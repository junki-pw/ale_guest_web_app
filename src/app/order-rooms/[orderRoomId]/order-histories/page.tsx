"use client";
import React from "react";
import OrderHistoryCartTile from "./components/order_history_cart_tile";
import useSWR from "swr";
import { orderHistoriesFetcher } from "./fetcher";
import { OrderHistory } from "@/domain/order_history";
import { OrderHistoriesState } from "./state";

interface OrderHistoriesPageProps {
  params: { orderRoomId: string };
}
export default function OrderHistoriesPage(props: OrderHistoriesPageProps) {
  const orderRoomId = props.params.orderRoomId;
  const { data, isLoading, error } = useSWR(
    `order-rooms/${orderRoomId}/order-histories`,
    () => orderHistoriesFetcher(orderRoomId)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error || data == undefined) {
    return <div>Error...</div>;
  }

  return (
    <div>
      {data.orderHistories.map((orderHistory) => (
        <_OrderHistoryTile
          key={orderHistory.orderId}
          orderHistory={orderHistory}
          data={data}
        />
      ))}
    </div>
  );
}

interface _OrderHistoryTile {
  orderHistory: OrderHistory;
  data: OrderHistoriesState;
}

const _OrderHistoryTile = ({ orderHistory, data }: _OrderHistoryTile) => {
  return (
    <div className="my-4 w-full mb-6">
      <div className="flex w-full justify-center">
        <div className="w-fit bg-gray-100 text-gray-400 px-3 py-1 text-center text-xs rounded-md">
          {orderHistory.createdAt?.toLocaleString()}
        </div>
      </div>
      {data.orderCarts.map((orderCart) =>
        orderHistory.orderId == orderCart.orderId ? (
          <OrderHistoryCartTile
            key={orderCart.orderCartId}
            orderCart={orderCart}
            data={data}
          />
        ) : (
          <div key={orderCart.orderCartId}></div>
        )
      )}
    </div>
  );
};
