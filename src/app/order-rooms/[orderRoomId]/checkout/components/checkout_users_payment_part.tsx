import { CheckoutState } from "../state";
import CheckoutTypes from "./checkout_user_payment/checkout_types";
import CheckoutUserTile from "./checkout_user_payment/checkout_user_tile";

interface CheckoutUsersPaymentPart {
  data: CheckoutState;
}

const _CheckoutType = ["splitBil", "host", "custom"];

export default function CheckoutUsersPaymentPart({
  data,
}: CheckoutUsersPaymentPart) {
  return (
    <div className="mt-4">
      <div className="px-4">
        <div className="flex-wrap mb-2.5">
          {_CheckoutType.map((e) => (
            <CheckoutTypes key={e} checkoutType={e} data={data} />
          ))}
        </div>
      </div>

      {data.orderRoomUsers.map((e) => (
        <CheckoutUserTile key={e.userId} data={data} orderRoomUser={e} />
      ))}
      <div className="w-full bg-gray-200 h-[6px] mt-4"></div>
    </div>
  );
}
