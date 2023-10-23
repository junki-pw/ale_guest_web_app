import { AppUser } from "@/domain/user";
import { atom } from "recoil";

export const currentUserState = atom<AppUser | null>({
  key: "currentUserState",
  default: null,
});
