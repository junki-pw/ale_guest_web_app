import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let initialPath: string | null = null;
let isInitialUrlGone: boolean = false;

const notLoginUserAvailablePagePaths = ["/login", "/"];

export async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  console.log("RedirectURL: " + pathName);

  if (initialPath != null) {
    return;
  }

  // 初期化処理
  initialPath = pathName;
  console.log("initialPath: " + pathName);

  if (notLoginUserAvailablePagePaths.indexOf(pathName) != -1) {
    return;
  }

  // 認証していない場合は認証してないユーザーでも閲覧可能なページに飛ばす
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/", "/order-rooms/:orderRoomId*", "/login"],
};
