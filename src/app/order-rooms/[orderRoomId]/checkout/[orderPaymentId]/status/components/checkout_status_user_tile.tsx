/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function CheckoutStatusUserTile() {
  return (
    <div className="px-4 py-1.5 flex items-center">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9">
        <img src="https://placehold.jp/240x240.png" alt="User Image" />
      </div>
      <h1 className="mx-3 text-left grow">ユーザー名</h1>
      <h2 className="text-xs text-gray-400">お会計待ち</h2>
    </div>
  );
}
