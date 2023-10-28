import useSWR from "swr";
import CheckoutBottomButton from "./components/checkout_bottom_button";
import CheckoutMenuOptionTile from "./components/checkout_menu_option_tile";
import CheckoutNotServedMenuTile from "./components/checkout_not_served_menu_tile";
import CheckoutUsersPaymentPart from "./components/checkout_users_payment_part";
import { checkoutFetcher } from "./fetcher";
import { useEffect } from "react";
import { CheckoutState } from "./state";

interface CheckoutProps {
  params: {
    orderRoomId: string;
  };
}

export default function CheckoutPage(props: CheckoutProps) {
  const orderRoomId = props.params.orderRoomId;
  const { data, isLoading, error } = useSWR<CheckoutState>(
    `order-rooms/${orderRoomId}/checkout`,
    () => checkoutFetcher(orderRoomId)
  );

  useEffect(() => {
    //todo firestore を監視している処理をリッスンしたら useSWR にデータを突っ込んであげる
  });

  return (
    <main className="mb-40 relative">
      <CheckoutUsersPaymentPart />
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h1>お会計</h1>
          <p>詳細を確認する ▶︎</p>
        </div>

        <CheckoutMenuOptionTile />
        <CheckoutMenuOptionTile />
        <CheckoutMenuOptionTile />
        <CheckoutMenuOptionTile />
        <CheckoutMenuOptionTile />
        <div className="mt-1 mb-2 h-[1px] bg-gray-200 w-full"></div>
        <div className="flex justify-between">
          <h1 className="font-bold">お会計</h1>
          <h1 className="font-bold">¥12,300</h1>
        </div>
      </div>
      <div className="w-full bg-gray-200 h-[6px]"></div>

      <div className="mt-4 px-4">
        <h1 className="mb-1 font-bold">まだ配膳されていない商品</h1>
        <p className="text-xs text-gray-400">
          ※
          既に配膳済みにも関わらず配膳されていない商品に該当する場合はお近くのスタッフにお知らせください。
        </p>
      </div>

      <CheckoutNotServedMenuTile />
      <CheckoutNotServedMenuTile />
      <CheckoutNotServedMenuTile />
      <CheckoutNotServedMenuTile />
      <CheckoutNotServedMenuTile />

      <CheckoutBottomButton />
    </main>
  );
}
