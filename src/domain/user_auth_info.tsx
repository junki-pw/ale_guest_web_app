import { DocumentData, FieldValue } from "firebase/firestore";

export interface UserAuthInfo {
  userId: string;
  signInMethod: string;
  isDeleted: boolean;
  isAgreeTermsAndConditions: boolean;
  fcmTokens: [];
  city: string | null;
  email: string | null;
  extraAddress: string | null;
  fullName: string | null;
  fullNameKana: string | null;
  gender: string | null;
  phoneNumber: string | null;
  prefecture: string | null;
  stripeCustomerId: string | null;
  setUpIntentClientSecretId: string | null;
  birthDate: Date | FieldValue | null;
  deletedAt: Date | FieldValue | null;
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const appUserFromJson = (data: DocumentData): UserAuthInfo => {
  return {
    userId: data.userId,
    signInMethod: data.signInMethod,
    isDeleted:
      data.isDeleted == undefined || data.isDeleted == null
        ? false
        : data.isDeleted,
    isAgreeTermsAndConditions:
      data.isAgreeTermsAndConditions == undefined ||
      data.isAgreeTermsAndConditions == null
        ? false
        : data.isAgreeTermsAndConditions,
    fcmTokens:
      data.fcmTokens == undefined || data.fcmTokens == null
        ? []
        : data.fcmTokens,
    city: data.city == undefined || data.city == null ? null : data.city,
    email: data.email == undefined || data.email == null ? null : data.email,
    extraAddress:
      data.extraAddress == undefined || data.extraAddress == null
        ? null
        : data.extraAddress,
    fullName:
      data.fullName == undefined || data.fullName == null
        ? null
        : data.fullName,
    fullNameKana:
      data.fullNameKana == undefined || data.fullNameKana == null
        ? null
        : data.fullNameKana,
    gender:
      data.gender == undefined || data.gender == null ? null : data.gender,
    phoneNumber:
      data.phoneNumber == undefined || data.phoneNumber == null
        ? null
        : data.phoneNumber,
    prefecture:
      data.prefecture == undefined || data.prefecture == null
        ? null
        : data.prefecture,
    stripeCustomerId:
      data.stripeCustomerId == undefined || data.stripeCustomerId == null
        ? null
        : data.stripeCustomerId,
    setUpIntentClientSecretId:
      data.setUpIntentClientSecretId == undefined ||
      data.setUpIntentClientSecretId == null
        ? null
        : data.setUpIntentClientSecretId,
    birthDate:
      data.birthDate == undefined || data.birthDate == null
        ? null
        : data.birthDate.toDate(),
    deletedAt:
      data.deletedAt == undefined || data.deletedAt == null
        ? null
        : data.deletedAt.toDate(),
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
