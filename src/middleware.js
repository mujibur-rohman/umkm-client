import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req, next) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // route home page
  // if (pathname === "/") {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/auth", req.url));
  //   }
  // }

  if (pathname.startsWith("/auth" || pathname.startsWith("/auth/register"))) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
