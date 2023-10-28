interface AmountProps {
  amount: number;
  externalTax: boolean;
  isReducedTaxRate: boolean;
}
export const convertAmount: ({
  amount,
  externalTax,
  isReducedTaxRate,
}: AmountProps) => number = ({
  amount,
  externalTax,
  isReducedTaxRate,
}: AmountProps) => {
  if (!externalTax) {
    return amount;
  }

  return convertWithTax(amount, isReducedTaxRate);
};

interface AmountProps {
  amount: number;
  isReducedTaxRate: boolean;
}

export const convertWithTax: (
  amount: number,
  isReducedTaxRate: boolean
) => number = (amount: number, isReducedTaxRate: boolean) => {
  return Math.floor(amount + amount * (isReducedTaxRate ? 0.08 : 0.1));
};

export const convertCorrects: (camount: number, orrects: any[]) => number = (
  amount: number,
  corrects: any[]
) => {
  return corrects.reduce((previousAmount: number, correct): number => {
    // accは「初期値 or 前回のreturn値」でvalは「配列要素」
    const type = correct["type"] ?? "savings";
    if (type == "savings") {
      /// 固定料金の場合
      const savings: number = correct["savings"] ?? 0;

      /// savings 自体がマイナスになってる場合があるから足し算でOK
      return previousAmount + savings;
    } else {
      /// パーセント
      const percent: number = correct["percent"] ?? 0;

      /// 小数点を加味した金額
      const percentAmountWithDecimalPoint: number =
        (previousAmount * percent) / 100;

      /// 小数点を切り捨て金額
      const roundedPercentAmount: number = percentRoundOff(
        percentAmountWithDecimalPoint
      );

      /// パーセント自体がマイナスになる場合があるから足し算でOK
      return previousAmount + roundedPercentAmount;
    }
  }, amount);
};

/// 割引で出てくるパーセントの小数点を四捨五入する処理
/// マイナスの時の切り捨ては ceil を使用する
/// -10.9円　の場合は -10円　になる必要があり
/// floor を使うと -11円になってしまうから ceil を使用する
const percentRoundOff: (amount: number) => number = (amount: number) => {
  return amount < 0 ? Math.ceil(amount) : Math.floor(amount);
};
