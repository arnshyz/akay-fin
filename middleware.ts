import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const url = req.nextUrl;
  const protectedPaths = [/^\/dashboard(\/.*)?$/, /^\/admin(\/.*)?$/];
  const isProtected = protectedPaths.some(re => re.test(url.pathname));
  if (isProtected && !session) { url.pathname = "/"; return NextResponse.redirect(url); }
  return NextResponse.next();
}
export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
