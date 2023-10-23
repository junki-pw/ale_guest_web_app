import { DocumentData, FieldValue } from "firebase/firestore";

export interface AppUser {
  userId: string;
  userIcon: string;
  userIdentifier: string;
  userName: string;
  bio: string;
  followerCount: number;
  followingCount: number;
  isStaff: boolean;
  updatedAt: Date | FieldValue | null;
}

export const appUserFromJson = (data: DocumentData): AppUser => {
  return {
    userId: data.userId,
    userIcon: data.userIcon,
    userIdentifier: data.userIdentifier,
    userName: data.userName,
    bio: data.bio == undefined || data.bio == null ? "" : data.bio,
    followerCount:
      data.followerCount == undefined || data.followerCount == null
        ? 0
        : data.followerCount,
    followingCount:
      data.followingCount == undefined || data.followingCount == null
        ? 0
        : data.followingCount,
    isStaff:
      data.isStaff == undefined || data.isStaff == null ? true : data.isStaff,
    updatedAt:
      data.updatedAt == undefined || data.updatedAt == null
        ? null
        : data.updatedAt.toDate(),
  };
};
