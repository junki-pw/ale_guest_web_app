import { DocumentData } from "firebase/firestore";

export interface OrderCart {
  orderCartId: string;
  orderRoomId: string;
  shopId: string;
  userIds: [];
  options: {};
  serveStatus: string;
  orderCartNumber: number;
  unLimitedPlanExtraCharge: number;
  unLimitedPlanExtraTime: number;
  isUnLimitedPlan: boolean;
  isDeleted: boolean;
  isReducedTaxRate: boolean;
  orderedFromGuest: boolean;
  corrects: [];
  servedPlanMenuIds: [];
  courseMenuOptions: {};
  planMenusServeStatus: {};
  userId: string | null;
  userIcon: string | null;
  userName: string | null;
  customMenuMemo: string | null;
  customMenuName: string | null;
  customMenuGenre: string | null;
  orderId: string | null;
  deleteUserId: string | null;
  deleteUserName: string | null;
  deleteUserIcon: string | null;
  menuId: string | null;
  customMenuPrice: number | null;
  orderedMenuAmount: number | null;
  unLimitedPlanStartAt: Date | null;
  deletedAt: Date | null;
  orderAt: Date | null;
  servedAt: Date | null;
  printedAt: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const orderCartFromJson = (
  data: DocumentData | undefined
): OrderCart | null => {
  if (data == undefined) {
    return null;
  }

  return {
    orderCartId: data.orderCartId,
    orderRoomId: data.orderRoomId,
    shopId: data.shopId,
    userIds: data.userIds,
    options: data.options,
    serveStatus:
      data.serveStatus == undefined || data.serveStatus == null
        ? "preparing"
        : data.serveStatus,
    orderCartNumber:
      data.orderCartNumber == undefined || data.orderCartNumber == null
        ? 10000
        : data.orderCartNumber,
    unLimitedPlanExtraCharge:
      data.unLimitedPlanExtraCharge == undefined ||
      data.unLimitedPlanExtraCharge == null
        ? 0
        : data.unLimitedPlanExtraCharge,
    unLimitedPlanExtraTime:
      data.unLimitedPlanExtraTime == undefined ||
      data.unLimitedPlanExtraTime == null
        ? 0
        : data.unLimitedPlanExtraTime,
    isUnLimitedPlan:
      data.isUnLimitedPlan == undefined || data.isUnLimitedPlan == null
        ? false
        : data.isUnLimitedPlan,
    isDeleted:
      data.isDeleted == undefined || data.isDeleted == null
        ? false
        : data.isDeleted,
    isReducedTaxRate:
      data.isReducedTaxRate == undefined || data.isReducedTaxRate == null
        ? false
        : data.isReducedTaxRate,
    orderedFromGuest:
      data.orderedFromGuest == undefined || data.orderedFromGuest == null
        ? true
        : data.orderedFromGuest,
    corrects:
      data.corrects == undefined || data.corrects == null ? [] : data.corrects,
    servedPlanMenuIds:
      data.servedPlanMenuIds == undefined || data.servedPlanMenuIds == null
        ? []
        : data.servedPlanMenuIds,
    courseMenuOptions:
      data.courseMenuOptions == undefined || data.courseMenuOptions == null
        ? {}
        : data.courseMenuOptions,
    planMenusServeStatus:
      data.planMenusServeStatus == undefined ||
      data.planMenusServeStatus == null
        ? {}
        : data.planMenusServeStatus,
    userId:
      data.userId == undefined || data.userId == null ? null : data.userId,
    userIcon:
      data.userIcon == undefined || data.userIcon == null
        ? null
        : data.userIcon,
    userName:
      data.userName == undefined || data.userName == null
        ? null
        : data.userName,
    customMenuMemo:
      data.customMenuMemo == undefined || data.customMenuMemo == null
        ? null
        : data.customMenuMemo,
    customMenuName:
      data.customMenuName == undefined || data.customMenuName == null
        ? null
        : data.customMenuName,
    customMenuGenre:
      data.customMenuGenre == undefined || data.customMenuGenre == null
        ? null
        : data.customMenuGenre,
    orderId:
      data.orderId == undefined || data.orderId == null ? null : data.orderId,
    deleteUserId:
      data.deleteUserId == undefined || data.deleteUserId == null
        ? null
        : data.deleteUserId,
    deleteUserName:
      data.deleteUserName == undefined || data.deleteUserName == null
        ? null
        : data.deleteUserName,
    deleteUserIcon:
      data.deleteUserIcon == undefined || data.deleteUserIcon == null
        ? null
        : data.deleteUserIcon,
    menuId:
      data.menuId == undefined || data.menuId == null ? null : data.menuId,
    customMenuPrice:
      data.customMenuPrice == undefined || data.customMenuPrice == null
        ? null
        : data.customMenuPrice,
    orderedMenuAmount:
      data.orderedMenuAmount == undefined || data.orderedMenuAmount == null
        ? null
        : data.orderedMenuAmount,
    unLimitedPlanStartAt:
      data.unLimitedPlanStartAt == undefined ||
      data.unLimitedPlanStartAt == null
        ? null
        : data.unLimitedPlanStartAt.toDate(),
    deletedAt:
      data.deletedAt == undefined || data.deletedAt == null
        ? null
        : data.deletedAt.toDate(),
    orderAt:
      data.orderAt == undefined || data.orderAt == null
        ? null
        : data.orderAt.toDate(),
    servedAt:
      data.servedAt == undefined || data.servedAt == null
        ? null
        : data.servedAt.toDate(),
    printedAt:
      data.printedAt == undefined || data.printedAt == null
        ? null
        : data.printedAt.toDate(),
    createdAt:
      data.createdAt == undefined || data.createdAt == null
        ? null
        : data.createdAt.toDate(),
    updatedAt:
      data.updatedAt == undefined || data.updatedAt == null
        ? null
        : data.updatedAt.toDate(),
  };
};
