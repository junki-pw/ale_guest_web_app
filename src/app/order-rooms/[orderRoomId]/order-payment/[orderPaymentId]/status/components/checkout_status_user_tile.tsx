import React from "react";
import Image from "next/image";
import { Payer } from "@/domain/payer";
import { kRequest } from "@/constants/keys";

interface CheckoutStatusUserTileProps {
  payer: Payer;
  isWaitingPayment: boolean;
}

export default function CheckoutStatusUserTile({
  payer,
  isWaitingPayment,
}: CheckoutStatusUserTileProps) {
  if (isWaitingPayment && payer.status != kRequest) {
    return <div></div>;
  } else if (!isWaitingPayment && payer.status == kRequest) {
    return <div></div>;
  }

  return (
    <div className="px-4 py-1.5 flex items-center">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9">
        <Image
          src={payer.payerIcon}
          alt={"user icon"}
          height={36}
          width={36}
          property=""
        ></Image>
      </div>
      <h1 className="mx-3 text-left grow">{payer.payerName}</h1>
      <h2 className="text-xs text-gray-400">
        {payer.status == kRequest ? "お会計待ち" : ""}
      </h2>
    </div>
  );
}
