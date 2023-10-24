import { DocumentData, FieldValue } from "firebase/firestore";

export interface CoverCharge {
  coverChargeId: string;
  coverChargeName: string;
  coverChargeCommonName: string;
  coverChargeDescription: string;
  coverChargeType: string;
  isActive: boolean;
  fixedFeeType: string | null;
  percent: number | null;
  fixedFee: number | null;
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const coverChargeFromJson = (data: DocumentData): CoverCharge => {
  return {
    coverChargeId: data.coverChargeId,
    coverChargeName: data.coverChargeName,
    coverChargeCommonName: data.coverChargeCommonName,
    coverChargeDescription: data.coverChargeDescription,
    coverChargeType: data.coverChargeType,
    isActive:
      data.isActive == undefined || data.isActive == null
        ? true
        : data.isActive,
    fixedFeeType:
      data.fixedFeeType == undefined || data.fixedFeeType == null
        ? null
        : data.fixedFeeType,
    percent:
      data.percent == undefined || data.percent == null ? null : data.percent,
    fixedFee:
      data.fixedFee == undefined || data.fixedFee == null
        ? null
        : data.fixedFee,
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
