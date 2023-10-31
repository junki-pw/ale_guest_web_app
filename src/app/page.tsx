/* eslint-disable @next/next/no-img-element */
"use client";

import { getOrderCartsContainedUnLimitedPlanById } from "@/repositories/order_cart";

export default function Home() {
  async function handleOnClicked() {
    const orderRoomId = "919a2da0-2506-42bb-86ef-713033374523";
    getOrderCartsContainedUnLimitedPlanById(orderRoomId);
  }

  return (
    <main className="flex flex-col pb-[120px]">
      <button onClick={handleOnClicked}>現在の時刻を取得する</button>
    </main>
  );
}
