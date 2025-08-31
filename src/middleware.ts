import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If user is authenticated
  if (token) {
    // Redirect authenticated users away from auth pages and home to dashboard
    if (
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/verify") ||
      url.pathname.startsWith("/sign-up")
    ) {
      console.log(
        "Authenticated user accessing auth page, redirecting to dashboard"
      );
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // Allow access to dashboard and other protected routes
    return NextResponse.next();
  }

  // If user is NOT authenticated
  if (!token) {
    // Redirect unauthenticated users away from protected routes
    if (url.pathname.startsWith("/dashboard")) {
      console.log(
        "Unauthenticated user accessing dashboard, redirecting to sign-in"
      );
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Allow access to auth pages and home page
    return NextResponse.next();
  }

  // Default: allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-up", "/sign-in", "/", "/verify/:path*", "/dashboard/:path*"],
};
