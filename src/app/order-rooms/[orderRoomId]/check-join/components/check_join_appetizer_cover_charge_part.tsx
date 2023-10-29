import React from "react";
import { CheckJoinState } from "../state";
import { CoverCharge } from "@/domain/cover_charge";

interface CheckJoinAppetizerCoverChargePartProps {
  data: CheckJoinState;
}

export default function CheckJoinAppetizerCoverChargePart({
  data,
}: CheckJoinAppetizerCoverChargePartProps) {
  if (!data.shop.isServeAppetizer && data.coverCharge == null) {
    return <div></div>;
  }

  const coverCharge: CoverCharge | null = data.coverCharge;

  return (
    <div className="px-4">
      <h1 className="font-bold text-md text-gray-500 mb-2">
        突き出し・テーブルチャージ
      </h1>

      {/* 突き出し */}
      {data.shop.isServeAppetizer ? (
        <_Tile
          title={data.shop.appetizerName}
          amountText={`¥ ${data.shop.appetizerPrice.toLocaleString()}`}
        />
      ) : (
        <div></div>
      )}

      <div className="h1"></div>

      {/* テーブルチャージ */}
      {coverCharge == null ? (
        <div></div>
      ) : (
        <_Tile
          title={coverCharge.coverChargeName}
          amountText={
            coverCharge.coverChargeType == "percent"
              ? `${coverCharge.percent}%`
              : `${coverCharge.fixedFee} /${
                  coverCharge.fixedFeeType == "perSeat" ? "席" : "名様"
                }`
          }
        />
      )}
    </div>
  );
}

interface _TileProps {
  title: string;
  amountText: string;
}

const _Tile = ({ title, amountText }: _TileProps) => {
  return (
    <div className="flex justify-between">
      <h2>{title}</h2>
      <p>{amountText}</p>
    </div>
  );
};
