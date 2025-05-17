import { NextRequest, NextResponse } from "next/server";
import getAuthUser from "./lib/get-auth-user";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/register"];
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const userToken = await getAuthUser();
  const userId = userToken?.userId;

  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicRoute && userId) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
