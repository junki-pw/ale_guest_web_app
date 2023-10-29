import { usersCollection } from "@/constants/firebase";
import { initialIcon } from "@/constants/urls";
import { AppUser, appUserFromJson } from "@/domain/user";
import { UserAuthInfo } from "@/domain/user_auth_info";
import { UserIdenfier } from "@/domain/user_identifier";
import { auth, db } from "@/providers/firebase";
import {
  DocumentData,
  DocumentSnapshot,
  doc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const insertUserInfo = async () => {
  const userId = auth.currentUser?.uid;
  if (userId == undefined) {
    return;
  }

  // user データを取得して、データが無い場合は新規作成
  await runTransaction(db, async (t) => {
    const userDocRef = doc(db, "users", userId);
    const isExisted: boolean = await t
      .get(userDocRef)
      .then((value) => value.data() != null);

    const latestUser: AppUser | null = await t
      .get(userDocRef)
      .then(function (value) {
        return value.data() != null ? appUserFromJson(value.data()!) : null;
      });
    console.log(latestUser);

    if (isExisted) {
      return;
    }

    // AppUser
    const user: AppUser = {
      userId: userId,
      userIcon: initialIcon,
      userIdentifier: uuidv4(),
      userName: "名無しさん",
      bio: "よろしくお願いします！",
      followerCount: 0,
      followingCount: 0,
      isStaff: false,
      updatedAt: serverTimestamp(),
    };
    t.set(userDocRef, user);

    /// UserIdentifier
    const userIdentifier: UserIdenfier = {
      userIdentifier: user.userIdentifier,
      userId: user.userId,
      userName: user.userName,
      userIcon: initialIcon,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const userIdentifierDocRef = doc(
      db,
      "user_identifiers",
      userIdentifier.userIdentifier
    );
    t.set(userIdentifierDocRef, userIdentifier);

    /// UserAuthInfo
    const userAuthInfo: UserAuthInfo = {
      userId: user.userId,
      signInMethod: "anonymous",
      isDeleted: false,
      isAgreeTermsAndConditions: false,
      fcmTokens: [],
      city: null,
      email: null,
      extraAddress: null,
      fullName: null,
      fullNameKana: null,
      gender: null,
      phoneNumber: null,
      prefecture: null,
      stripeCustomerId: null,
      setUpIntentClientSecretId: null,
      birthDate: null,
      deletedAt: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const userAuthInfoDocref = doc(db, "user_auth_info", userAuthInfo.userId);
    t.set(userAuthInfoDocref, userAuthInfo);
  });
};

export const streamCurrentUser = (
  onNext: (snapshot: DocumentSnapshot<DocumentData, DocumentData>) => void
) => {
  onSnapshot(doc(db, usersCollection, auth.currentUser!.uid), onNext);
};
