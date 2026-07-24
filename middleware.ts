import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "super-secret-tpo-jwt-token-key-2026",
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("tpo_session")?.value;

  let session: any = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      session = payload;
    } catch (e) {
      session = null;
    }
  }

  // Auth pages redirect if logged in
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (session) {
      if (session.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else if (session.role === "RECRUITER") {
        return NextResponse.redirect(new URL("/recruiter", request.url));
      } else {
        return NextResponse.redirect(new URL("/student", request.url));
      }
    }
    return NextResponse.next();
  }

  // Protected route enforcement
  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(
        new URL("/login?error=Unauthorized", request.url),
      );
    }
    if (session.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/student")) {
    if (!session) {
      return NextResponse.redirect(
        new URL("/login?error=Unauthorized", request.url),
      );
    }
    if (session.role !== "STUDENT") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/recruiter")) {
    if (!session) {
      return NextResponse.redirect(
        new URL("/login?error=Unauthorized", request.url),
      );
    }
    if (session.role !== "RECRUITER") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/student/:path*",
    "/recruiter/:path*",
    "/login",
    "/register",
  ],
};
