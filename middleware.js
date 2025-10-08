import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-fallback-secret-key"
);

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("session_token")?.value;

  // NEW LOGIC: If a logged-in user tries to visit the login page, redirect them to the dashboard
  if (pathname === "/admin/login" && token) {
    try {
      await jwtVerify(token, SECRET_KEY);
      // If token is valid, redirect away from login to the admin dashboard
      return NextResponse.redirect(new URL("/admin", request.url));
    } catch (err) {
      // If token is invalid, let them stay on the login page
      return NextResponse.next();
    }
  }

  // Protect all other admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
