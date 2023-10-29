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
  customAmount: {};
  checkoutType: string;
}

/// 1人あたりの支払い金額の計算
export const calcCheckoutAmountPerPerson = ({
  amount,
  userId,
  isHost,
  userCount,
  customAmount,
  checkoutType,
}: CalcCheckoutAmountPerPersonProps) => {
  switch (checkoutType) {
    /// 全体の料金を人数で割って、余りと商を出して余りはホストに全部足す
    case "splitBil":
      const quotient: number = Math.floor(amount / userCount);
      const remainder: number = amount % userCount;
      return isHost ? quotient + remainder : quotient;

    /// 全てホスト持ち
    case "host":
      return isHost ? amount : 0;

    /// カスタム→自分で入力
    case "custom":
      return (customAmount as any)[userId] ?? 0;
  }
};
