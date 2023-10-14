import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const url = req.url;
    const parsedUrl = new URL(url);
    const pathName = parsedUrl.pathname;
    console.log('RedirectURL: ' + pathName);

    //todo 認証していない場合は認証ページに飛ばす

    // return NextResponse.redirect(new URL('/redirect', req.url))
}

export const config = {
    matcher: [],
};