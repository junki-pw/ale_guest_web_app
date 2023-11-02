import React from "react";
import { CheckoutState } from "../state";
import { useCurrentUser } from "@/hooks/current_user";

interface CheckoutBottomButtonProps {
  data: CheckoutState;
}

export default function CheckoutBottomButton({
  data,
}: CheckoutBottomButtonProps) {
  const { currentUser } = useCurrentUser();
  if (data.orderRoom.hostId != currentUser?.userId) {
    return <div></div>;
  }

  return (
    <div className="fixed bottom-3 px-4 w-full">
      <button className="w-full bg-orange-400 py-3 rounded-lg font-bold text-white">
        お会計を作成する
      </button>
    </div>
  );
}
