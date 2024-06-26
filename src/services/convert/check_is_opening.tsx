import { HolidayBH } from "@/domain/holiday_bh";
import { NormalBH } from "@/domain/normal_bh";

interface checkIsOpeningProps {
  currentDateTime: Date;
  normalBHs: NormalBH[];
  holidayBHs: HolidayBH[];
}

export function checkIsOpening({
  currentDateTime,
  normalBHs,
  holidayBHs,
}: checkIsOpeningProps): boolean {
  /// 先に休日営業の場合を行う（休日営業のデータより優先度が高いから）
  for (const holidayBH of holidayBHs) {
    if (holidayBH.isClosedAllDay) {
      /// 本日、一日中閉店している場合は早期リターン
      return false;
    } else if (
      holidayBH.openAt <= currentDateTime &&
      holidayBH.endAt < currentDateTime
    ) {
      /// openAt < currentDateTime < endAt の場合：空いてる
      return true;
    }
  }

  /// 通常営業よりも休日営業の方が優先度が高いため1以上の場合で処理を実行する
  if (holidayBHs.length == 0) {
    /// 現在時刻の minutes を取得する
    const currentTime: number =
      currentDateTime.getHours() * 60 + currentDateTime.getMinutes();

    for (const normalBH of normalBHs) {
      /// openAt < currentDateTime < endAt の場合
      if (normalBH.openTime <= currentTime && currentTime < normalBH.endTime) {
        return true;
      }
    }
  }

  return false;
}
