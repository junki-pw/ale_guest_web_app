import { OrderRoom } from "@/domain/order_room";
import { convertCorrects } from "../convert/number";

interface CalcCheckoutProps {
  orderedAmount: number;
  appetizerAmount: number;
  coverChargeAmount: number;
  orderRoom: OrderRoom;
}

/// お会計時の合計料金（税込）
export const calcCheckoutAmount = ({
  orderedAmount,
  appetizerAmount,
  coverChargeAmount,
  orderRoom,
}: CalcCheckoutProps) => {
  const amount: number = orderedAmount + appetizerAmount + coverChargeAmount;
  return convertCorrects(amount, orderRoom.corrects);
};

interface CalcCheckoutAmountPerPersonProps {
  amount: number;
  userId: string;
  isHost: boolean;
  userCount: number;
  customAmount: number;
}

export const calcCheckoutAmountPerPerson = () => {};

/// 1人あたりの支払い金額の計算
// @riverpod
// int calcCheckoutAmountPerPerson(
//   CalcCheckoutAmountPerPersonRef ref, {
//   required CheckoutType checkoutType,

//   /// 支払いの合計金額
//   required int amount,

//   /// 選択されたユーザー
//   required String userId,

//   /// このユーザーがホストかどうか
//   required bool isHost,

//   /// ユーザー数
//   required int userCount,

//   /// カスタムを選択時の各ユーザーの支払い金額
//   required Map<String, int> customAmount,
// }) {
//   switch (checkoutType) {
//     /// 全体の料金を人数で割って、余りと商を出して余りはホストに全部足す
//     case CheckoutType.splitBil:
//       final int quotient = amount ~/ userCount;
//       final int remainder = amount % userCount;
//       return isHost ? quotient + remainder : quotient;

//     /// 全てホスト持ち
//     case CheckoutType.host:
//       return isHost ? amount : 0;

//     /// カスタム→自分で入力
//     case CheckoutType.custom:
//       return customAmount[userId] ?? 0;
//   }
// }
