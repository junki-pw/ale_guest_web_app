import { auth } from "@/providers/firebase";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let _initialRedirect = true;
let _initialPath;
let isInitialUrlGone = false;

const notLoginUserAvailablePagePaths = ["/login", "/"];

export async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  console.log("URL: " + pathName);

  const firebaseUser = auth.currentUser;
  console.log("firebaseUser: " + firebaseUser?.uid);

  // 初期化処理
  if (_initialRedirect) {
    _initialRedirect = false;
    _initialPath = pathName;
    console.log("initialPath: " + pathName);
  }

  if (firebaseUser == undefined) {
    console.log("未認証ページに遷移");

    if (notLoginUserAvailablePagePaths.indexOf(pathName) != -1) {
      return;
    }

    // register, login, invite-email, pass-reset, home 以外は login に飛ばす
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // home に飛ばして初期化処理すれば良さそう（初期化処理の後に画面遷移する）

  //todo 認証していない場合は認証ページに飛ばす
}

export const config = {
  matcher: ["/", "/order-rooms/:orderRoomId*", "/login"],
};
