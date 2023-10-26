/// 現在の時刻が営業時間内のデータだけ取得する
/// currentDateTime の日付を取得して

import { holidayBHsCollection } from "@/constants/firebase";
import { isActive, kEndAt, kOpenAt } from "@/constants/keys";
import { HolidayBH, holidayBHFromJson } from "@/domain/holiday_bh";
import { db } from "@/providers/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

/// その日の 0:00 ~ 23:59:59 までの休日営業時間データを全て取得
export const getTodayHolidayBHs: (
  currentDateTime: Date
) => Promise<HolidayBH[]> = async (currentDateTime: Date) => {
  /// 当日の0:00:00
  const openAt: Date = new Date(
    currentDateTime.getFullYear(),
    currentDateTime.getMonth(),
    currentDateTime.getDate()
  );

  /// 翌日の0:00:00
  const endAt: Date = new Date(
    openAt.getFullYear(),
    openAt.getMonth(),
    openAt.getDate() + 1
  );

  /// 通常営業よりも休日営業の方が優先されるから取得したデータは全て返却
  const coll = collection(db, holidayBHsCollection);
  const q = query(
    coll,
    where(isActive, "==", true),
    where(kOpenAt, ">=", openAt),
    where(kOpenAt, "<", endAt)
  );

  return await getDocs(q).then((value) =>
    value.docs.map((e) => holidayBHFromJson(e.data()))
  );
};
