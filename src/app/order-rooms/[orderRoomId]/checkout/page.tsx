"use client";

import useSWR, { KeyedMutator } from "swr";
import CheckoutBottomButton from "./components/checkout_bottom_button";
import CheckoutNotServedMenuTile from "./components/checkout_not_served_menu_tile";
import CheckoutUsersPaymentPart from "./components/checkout_users_payment_part";
import { checkoutFetcher, useCheckoutHooks } from "./fetcher";
import { useEffect } from "react";
import { CheckoutState } from "./state";
import CheckoutOrdersPart from "./components/checkout_orders_part";
import { streamOrderCartsByOrderRoomId } from "@/repositories/order_cart";
import { runTransaction } from "firebase/firestore";

interface CheckoutProps {
  params: {
    orderRoomId: string;
  };
}

export default function CheckoutPage(props: CheckoutProps) {
  const orderRoomId = props.params.orderRoomId;
  const { data, isLoading, error, mutate } = useSWR<CheckoutState>(
    `order-rooms/${orderRoomId}/checkout`,
    () => checkoutFetcher(orderRoomId)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (data == undefined || error) {
    return <div>Error...</div>;
  }

  // return Body({ data, mutate });
  return <_Body data={data} mutate={mutate} />;
}

interface _BodyProps {
  data: CheckoutState;
  mutate: KeyedMutator<CheckoutState>;
}

function _Body({ data, mutate }: _BodyProps) {
  useCheckoutHooks({ data, mutate });

  return (
    <main className="mb-40 relative">
      {/* ユーザー */}
      <CheckoutUsersPaymentPart data={data} mutate={mutate} />

      {/* オーダー */}
      <CheckoutOrdersPart data={data} />
      <div className="w-full bg-gray-200 h-[6px]"></div>

      <div className="mt-4 px-4">
        <h1 className="mb-1 font-bold">まだ配膳されていない商品</h1>
        <p className="text-xs text-gray-400">
          ※
          既に配膳済みにも関わらず配膳されていない商品に該当する場合はお近くのスタッフにお知らせください。
        </p>
      </div>

      {data.orderCarts.map((orderCart) => (
        <CheckoutNotServedMenuTile
          key={orderCart.orderCartId}
          orderCart={orderCart}
          data={data}
        />
      ))}

      <CheckoutBottomButton data={data} mutate={mutate} />
    </main>
  );
}
