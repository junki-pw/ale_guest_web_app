import { auth } from "@/providers/firebase";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let _initialRedirect = true;
let _initialUrl;

export async function middleware(req: NextRequest) {
  const url = req.url;
  const parsedUrl = new URL(url);
  const pathName = parsedUrl.pathname;
  console.log("RedirectURL: " + pathName);

  // 初期化処理
  if (_initialRedirect) {
    _initialRedirect = false;
    _initialUrl = pathName;
    console.log("最初の画面: " + pathName);

    // home に飛ばして初期化処理すれば良さそう（初期化処理の後に画面遷移する）

    // return NextResponse.redirect(new URL("/redirect", req.url));
  }
  const firebaseUser = auth.currentUser;
  console.log("firebaseUser: " + firebaseUser?.uid);

  //todo 認証していない場合は認証ページに飛ばす
}

export const config = {
  matcher: ["/", "/order-rooms"],
};
