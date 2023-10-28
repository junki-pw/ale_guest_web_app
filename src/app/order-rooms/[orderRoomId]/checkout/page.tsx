"use client";

import useSWR from "swr";
import CheckoutBottomButton from "./components/checkout_bottom_button";
import CheckoutNotServedMenuTile from "./components/checkout_not_served_menu_tile";
import CheckoutUsersPaymentPart from "./components/checkout_users_payment_part";
import { checkoutFetcher } from "./fetcher";
import { useEffect } from "react";
import { CheckoutState } from "./state";
import CheckoutOrdersPart from "./components/checkout_orders_part";

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

  useEffect(() => {
    //todo firestore を監視している処理をリッスンしたら useSWR にデータを突っ込んであげる
    //todo order_room の userIds に変化があったら invalidate する
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (data == undefined || error) {
    return <div>Error...</div>;
  }

  return (
    <main className="mb-40 relative">
      <CheckoutUsersPaymentPart data={data} />
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

      <CheckoutBottomButton />
    </main>
  );
}
