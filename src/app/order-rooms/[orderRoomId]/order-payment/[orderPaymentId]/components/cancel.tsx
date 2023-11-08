import React from "react";
import Image from "next/image";
import cancel from "../../../../../../../public/cancel.png";

export default function OrderPaymentCancelView() {
  return (
    <div className="py-6">
      <div className="flex justify-center">
        <div className="w-[120px] h-[120px] text-center">
          <Image
            src={cancel}
            alt={"cancel icon"}
            width={120}
            height={120}
          ></Image>
        </div>
      </div>
      <h1 className="mt-6 mb-3 text-rose-800 font-bold text-2xl text-center">
        お支払いキャンセル
      </h1>
      <p className="text-center text-xs text-gray-500">
        既にお会計をキャンセルしています。
        <br />
        お持ちのカードに反映するのに 3 ~
        <br />
        5営業日かかる場合がございます。
      </p>
    </div>
  );
}
