import React from "react";
import OrderHistoryCartTile from "./components/order_history_cart_tile";

export default function OrderCartPage() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return <div>{list.map((e) => _OrderHistoryTile())}</div>;
}

const _OrderHistoryTile = () => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="my-4 w-full mb-6">
      <div className="flex w-full justify-center">
        <div className="w-fit bg-gray-100 text-gray-400 px-3 py-1 text-center text-xs rounded-md">
          4分前
        </div>
      </div>
      {list.map((e) => (
        <OrderHistoryCartTile key={e} />
      ))}
    </div>
  );
};
