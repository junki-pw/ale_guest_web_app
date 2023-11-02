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
}: checkIsOpeningProps) {
  /// 先に休日営業の場合を行う（優先度が高いから）
  let isHolidayOpening: boolean = false;
  for (const holidayBH of holidayBHs) {
    /// 本日、一日中閉店している場合は早期リターン
    if (holidayBH.isClosedAllDay) {
      return false;
    }

    /// openAt < currentDateTime < endAt の場合
    if (
      currentDateTime < holidayBH.openAt &&
      holidayBH.endAt < currentDateTime
    ) {
      isHolidayOpening = true;
    }
  }

  /// 通常営業よりも休日営業の方が優先されるため
  /// 休日営業のデータがある場合はそちらを採用
  if (holidayBHs.length == 0) {
    return isHolidayOpening;
  }

  /// 通常営業の場合
  let isNormalOpening: boolean = false;
  const currentTime: number =
    currentDateTime.getHours() * 60 + currentDateTime.getMinutes();
  for (const normalBH of normalBHs) {
    /// openAt < currentDateTime < endAt の場合
    if (normalBH.openTime <= currentTime && currentTime <= normalBH.endTime) {
      isNormalOpening = true;
    }
  }

  return isNormalOpening;
}
