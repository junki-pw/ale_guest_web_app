import React from "react";

export default function CheckoutStatusHead() {
  return (
    <div className="px-4">
      <h1 className="text-lg font-bold">重要</h1>
      <div className="h-3"></div>
      <h2 className="font-bold">
        お会計ステータスは管理者様のみ変更可能です。
      </h2>
      <div className="h-3"></div>
      <p className="text-gray-500 text-xs">
        もし、他のユーザーが様々な理由で
        <br />
        ステータスを変更できない場合に変更してください。
        <br />
        <br />
        尚、管理者様も変更できない場合はお近くのスタッフをお呼び下さい。
        <br />
        使用例）
        <br />
        <br />
        酔い潰れてアプリを触れる状況にない
      </p>
    </div>
  );
}
