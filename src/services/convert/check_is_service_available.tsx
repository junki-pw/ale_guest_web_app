import { MenuCategory } from "@/domain/menu_category";
import { convertWeekDayString } from "@/repositories/normal_bh";
import { endAt } from "firebase/firestore";
import dynamic from "next/dynamic";

interface checkIsServiceAvailableProps {
  category: MenuCategory;
  currentDateTime: Date;
}

/// カテゴリーの提供時間かどうかをチェック flag
/// 複数ある提供時間と曜日に1つでもヒットしたらokになる
export function checkIsServiceAvailable({
  category,
  currentDateTime,
}: checkIsServiceAvailableProps): boolean {
  if (category.isAlwaysVisible) {
    return true;
  }

  /// 「今」の時間を「分」に計算
  const todayMinutes: number =
    currentDateTime.getHours() * 60 + currentDateTime.getMinutes();

  /// 「今」の曜日
  const todayDayOfWeek: string | null = convertWeekDayString(currentDateTime);

  for (let serveTimeMap of Object.values(category.serveTime)) {
    const dayOfWeeks: [] = (serveTimeMap as any)["dayOfWeeks"] ?? [];
    const openAt: number = (serveTimeMap as any)["openTime"] ?? 0;
    const endAt: number = (serveTimeMap as any)["endTime"] ?? 0;

    /// 「今の曜日」が提供時間内に入ってるか
    const isContainedDayWeeks: boolean = (dayOfWeeks as any).includes(
      todayDayOfWeek
    );

    /// 曜日ok && startAt <= todayMinutes <= endAt
    if (
      isContainedDayWeeks &&
      openAt <= todayMinutes &&
      todayMinutes <= endAt
    ) {
      return true;
    }
  }

  return false;
}
