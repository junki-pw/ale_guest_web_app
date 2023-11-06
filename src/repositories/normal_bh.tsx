import { normalBHsCollection, shopsCollection } from "@/constants/firebase";
import { isActive, kDayWeek } from "@/constants/keys";
import { NormalBH, normalBHFromJson } from "@/domain/normal_bh";
import { db } from "@/providers/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

/// 本日の営業時間を全て取得する
/// 現在の時刻が営業時間内のデータだけ取得する
export async function getTodayNormalBHs(
  currentDateTime: Date,
  shopId: string
): Promise<NormalBH[]> {
  const currentTime: number =
    currentDateTime.getHours() * 60 + currentDateTime.getMinutes();

  /// 「今」の曜日
  const dayWeek: string | null = convertWeekDayString(currentDateTime);

  console.log(dayWeek);

  const coll = collection(db, shopsCollection, shopId, normalBHsCollection);
  const q = query(
    coll,
    where(kDayWeek, "==", dayWeek),
    where(isActive, "==", true)
  );

  let normalBHs: NormalBH[] = [];

  await getDocs(q).then((value) =>
    value.docs.map((e) => {
      const normalBH: NormalBH = normalBHFromJson(e.data());

      if (normalBH.openTime <= currentTime && currentTime < normalBH.endTime) {
        normalBHs = [...normalBHs, normalBH];
      }

      return normalBHs;
    })
  );

  return normalBHs;
}

/// 曜日（略）を取得
export const convertWeekDayString: (currentDateTime: Date) => string | null = (
  currentDateTime: Date
) => {
  switch (currentDateTime.getDay()) {
    case 0:
      return "sun";
    case 1:
      return "mon";
    case 2:
      return "tue";
    case 3:
      return "wed";
    case 4:
      return "thu";
    case 5:
      return "fri";
    case 6:
      return "sat";
    default:
      return null;
  }
};
