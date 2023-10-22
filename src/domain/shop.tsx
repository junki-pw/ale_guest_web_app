import { DocumentData } from "firebase/firestore";

export interface Shop {
  shopId: string;
  shopIdentifier: string;

  // default
  shopIcon: string;
  shopName: string;
  shopPrContent: string;
  orderFirstMessage: string;
  orderLastMessage: string;
  appetizerName: string;
  appetizerDescription: string;
  taxRateType: string;
  appetizerPrice: number;
  dailyConfirmedReservationLimit: number;
  reservationChangePeriod: number;
  orderRoomCount: number;
  reservationCount: number;
  reservationMinimumCapacity: number;
  reservationMaximumCapacity: number;
  withdrawalCount: number;
  acceptReservation: boolean;
  externalTax: boolean;
  isActive: boolean;
  isRequiredCancelFee: boolean;
  isServeAppetizer: boolean;
  courseCancelFee: {};

  // null
  prefecture: string | null;
  city: string | null;
  extraAddress: string | null;
  accessInfo: string | null;
  shopUrl: string | null;
  shopPhoneNumber: string | null;
  updatedAt: string | Date;
}

export const shopFromJson = (data: DocumentData): Shop => {
  return {
    shopId: data.shopId,
    shopIdentifier: data.shopIdentifier,

    // default
    shopIcon:
      data.shopIcon == undefined || data.shopIcon == null ? "" : data.shopIcon,
    shopName:
      data.shopName == undefined || data.shopName == null ? "" : data.shopName,
    shopPrContent:
      data.shopPrContent == undefined || data.shopPrContent == null
        ? ""
        : data.shopPrContent,
    orderFirstMessage:
      data.orderFirstMessage == undefined || data.orderFirstMessage == null
        ? ""
        : data.orderFirstMessage,
    orderLastMessage:
      data.orderLastMessage == undefined || data.orderLastMessage == null
        ? ""
        : data.orderLastMessage,
    appetizerName:
      data.appetizerName == undefined || data.appetizerName == null
        ? ""
        : data.appetizerName,
    appetizerDescription:
      data.appetizerDescription == undefined ||
      data.appetizerDescription == null
        ? ""
        : data.appetizerDescription,
    taxRateType:
      data.taxRateType == undefined || data.taxRateType == null
        ? ""
        : data.taxRateType,
    appetizerPrice:
      data.appetizerPrice == undefined || data.appetizerPrice == null
        ? ""
        : data.appetizerPrice,
    dailyConfirmedReservationLimit:
      data.dailyConfirmedReservationLimit == undefined ||
      data.dailyConfirmedReservationLimit == null
        ? 5
        : data.dailyConfirmedReservationLimit,
    reservationChangePeriod:
      data.reservationChangePeriod == undefined ||
      data.reservationChangePeriod == null
        ? 48
        : data.reservationChangePeriod,
    orderRoomCount:
      data.orderRoomCount == undefined || data.orderRoomCount == null
        ? 0
        : data.orderRoomCount,
    reservationCount:
      data.reservationCount == undefined || data.reservationCount == null
        ? 0
        : data.reservationCount,
    reservationMinimumCapacity:
      data.reservationMinimumCapacity == undefined ||
      data.reservationMinimumCapacity == null
        ? 0
        : data.reservationMinimumCapacity,
    reservationMaximumCapacity:
      data.reservationMaximumCapacity == undefined ||
      data.reservationMaximumCapacity == null
        ? 3
        : data.reservationMaximumCapacity,
    withdrawalCount:
      data.withdrawalCount == undefined || data.withdrawalCount == null
        ? 0
        : data.withdrawalCount,
    acceptReservation:
      data.acceptReservation == undefined || data.acceptReservation == null
        ? 3
        : data.acceptReservation,
    externalTax:
      data.externalTax == undefined || data.externalTax == null
        ? true
        : data.externalTax,
    isActive:
      data.isActive == undefined || data.isActive == null ? {} : data.isActive,
    isRequiredCancelFee:
      data.isRequiredCancelFee == undefined || data.isRequiredCancelFee == null
        ? true
        : data.isRequiredCancelFee,
    isServeAppetizer:
      data.isServeAppetizer == undefined || data.isServeAppetizer == null
        ? false
        : data.isServeAppetizer,
    courseCancelFee:
      data.courseCancelFee == undefined || data.courseCancelFee == null
        ? false
        : data.courseCancelFee,

    // null
    prefecture: data.prefecture == undefined ? null : data.prefecture,
    city: data.city == undefined ? null : data.city,
    extraAddress: data.extraAddress == undefined ? null : data.extraAddress,
    accessInfo: data.accessInfo == undefined ? null : data.accessInfo,
    shopUrl: data.shopUrl == undefined ? null : data.shopUrl,
    shopPhoneNumber:
      data.shopPhoneNumber == undefined ? null : data.shopPhoneNumber,
    updatedAt: data.updatedAt == undefined ? null : data.updatedAt,
  };
};
