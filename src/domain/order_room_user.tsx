import { DocumentData, FieldValue } from "firebase/firestore";

export interface OrderRoomUser {
  userId: string;
  userName: string;
  userIcon: string;
  unReadCount: number;
  isActive: boolean;
  invitedUserId: string | null;
  invitedUserIcon: string | null;
  invitedUserName: string | null;
  inviteStatus: string | null;
  joinedAt: Date | FieldValue | null;
  rejectedAt: Date | FieldValue | null;
  leftAt: Date | FieldValue | null;
  lastReadAt: Date | FieldValue | null;
  createdAt: Date | FieldValue | null;
  updatedAt: Date | FieldValue | null;
}

export const orderRoomUserFromJson = (data: DocumentData): OrderRoomUser => {
  return {
    userId: data.userId,
    userName: data.userName,
    userIcon: data.userIcon,
    unReadCount:
      data.unReadCount == undefined || data.unReadCount == null
        ? 0
        : data.unReadCount,
    isActive:
      data.isActive == undefined || data.isActive == null
        ? true
        : data.isActive,
    invitedUserId:
      data.invitedUserId == undefined || data.invitedUserId == null
        ? null
        : data.invitedUserId,
    invitedUserIcon:
      data.invitedUserIcon == undefined || data.invitedUserIcon == null
        ? null
        : data.invitedUserIcon,
    invitedUserName:
      data.invitedUserName == undefined || data.invitedUserName == null
        ? null
        : data.invitedUserName,
    inviteStatus:
      data.inviteStatus == undefined || data.inviteStatus == null
        ? null
        : data.inviteStatus,
    joinedAt:
      data.joinedAt == undefined || data.joinedAt == null
        ? null
        : data.joinedAt.toDate(),
    rejectedAt:
      data.rejectedAt == undefined || data.rejectedAt == null
        ? null
        : data.rejectedAt.toDate(),
    leftAt:
      data.leftAt == undefined || data.leftAt == null
        ? null
        : data.leftAt.toDate(),
    lastReadAt:
      data.lastReadAt == undefined || data.lastReadAt == null
        ? null
        : data.lastReadAt.toDate(),
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
