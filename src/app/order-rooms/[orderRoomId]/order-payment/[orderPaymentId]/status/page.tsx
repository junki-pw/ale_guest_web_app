"use client";
import useSWR, { mutate } from "swr";
import CheckoutStatusUserTile from "./components/checkout_status_user_tile";
import { checkoutStatusFetcher } from "./fetcher";
import { CheckoutStatuBottom } from "./components/checkout_status_bottom_button";
import CheckoutStatusHead from "./components/head";

interface CheckoutStatusPageProps {
  params: {
    orderRoomId: string;
    orderPaymentId: string;
  };
}

export default function CheckoutStatusPage(props: CheckoutStatusPageProps) {
  const orderRoomId = props.params.orderRoomId;
  const orderPaymentId = props.params.orderPaymentId;
  const { data, isLoading, error } = useSWR(
    `order-rooms/${orderRoomId}/checkout/${orderPaymentId}/status`,
    () =>
      checkoutStatusFetcher({
        orderRoomId: orderRoomId,
        orderPaymentId: orderPaymentId,
      })
  );

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error || data == undefined) {
    return <div>Error...</div>;
  }

  return (
    <main className="relative my-6">
      <CheckoutStatusHead />
      <div className="h-6"></div>
      <h1 className="pl-4 mb-2 text-gray-400 font-bold">お会計待ち</h1>

      {data.payers.map((payer) => (
        <CheckoutStatusUserTile
          key={payer.payerId}
          payer={payer}
          isWaitingPayment={true}
        />
      ))}

      <h1 className="pl-4 mb-2 text-gray-400 font-bold">お会計済み</h1>
      {data.payers.map((payer) => (
        <CheckoutStatusUserTile
          key={payer.payerId}
          payer={payer}
          isWaitingPayment={false}
        />
      ))}
      <div className="h-[120px]"></div>

      <CheckoutStatuBottom data={data} mutate={mutate} />
    </main>
  );
}
