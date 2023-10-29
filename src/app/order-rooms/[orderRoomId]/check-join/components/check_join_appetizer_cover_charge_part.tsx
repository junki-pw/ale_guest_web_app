import React from "react";
import { CheckJoinState } from "../state";

interface CheckJoinAppetizerCoverChargePartProps {
  data: CheckJoinState;
}

export default function CheckJoinAppetizerCoverChargePart({
  data,
}: CheckJoinAppetizerCoverChargePartProps) {
  if (!data.shop.isServeAppetizer && data.coverCharge == null) {
    return <div></div>;
  }

  return (
    <div>
      <div className="pb-2 pt-8  font-bold text-gray-600 text-xl">
        突き出し・テーブルチャージ
      </div>
      <div className="flex justify-between ">
        <div className="text-gray-600">{data.shop.appetizerName}</div>
        <div>¥{data.shop.appetizerPrice.toLocaleString()}</div>
      </div>
      {/* <div className="flex justify-between ">
        <div className="text-gray-600">{data.coverCharge?.coverChargeName}</div>
        <div>￥5000/席</div>
      </div> */}
    </div>
  );
}
