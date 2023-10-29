import React from "react";

export default function OrderHistoryCartTile() {
  return (
    <button className="px-4 py-3 w-full text-left">
      <h1 className="text-md font-bold">タイトル</h1>
      <p className="mt-1 text-xs text-gray-400">オプションテキスト</p>
      <div className="mt-2 flex justify-between">
        <p className="text-orange-400">¥ 9,800</p>
        <p className="text-gray-400">配膳済み</p>
      </div>
    </button>
  );
}
