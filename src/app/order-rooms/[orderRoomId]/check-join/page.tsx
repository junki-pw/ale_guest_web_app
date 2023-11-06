"use client";
import useSWR from "swr";
import { checkJoinFetcher } from "./fetcher";
import { CheckJoinState } from "./state";
import CheckJoinAppetizerCoverChargePart from "./components/check_join_appetizer_cover_charge_part";
import CheckJoinHeadPart from "./components/check_join_head_part";
import CheckJoinShopPart from "./components/check_join_shop_part";
import CheckJoinSeatPart from "./components/check_join_seat_part";
import CheckJoinUsersPart from "./components/check_join_users_part";
import CheckJoinBottom from "./components/check_join_bottom";

interface CheckJoinPageProps {
  params: { orderRoomId: string };
}

export default function CheckJoinPage(props: CheckJoinPageProps) {
  const orderRoomId = props.params.orderRoomId;
  const { data, isLoading, error } = useSWR<CheckJoinState>(
    `order-rooms/${orderRoomId}/check-join`,
    () => checkJoinFetcher(orderRoomId)
  );

  if (isLoading) {
    return <div>Loading</div>;
  } else if (error || data == undefined) {
    return <div>error</div>;
  }

  return (
    <main className="relative pt-6">
      {/* ヘッダー */}
      <CheckJoinHeadPart data={data} />
      <div className="h-6"></div>

      {/* 店舗情報 */}
      <CheckJoinShopPart data={data} />
      <div className="h-6"></div>

      {/* 座席 */}
      <CheckJoinSeatPart data={data} />
      <div className="h-6"></div>

      {/* 突き出し・テーブルチャージ */}
      <CheckJoinAppetizerCoverChargePart data={data} />
      <div className="h-6"></div>

      {/* ユーザーリスト */}
      <CheckJoinUsersPart data={data} />
      <div className="h-[120px]"></div>

      {/* 参加ボタン */}
      <CheckJoinBottom orderRoomId={data.orderRoom.orderRoomId} />
    </main>
  );
}
