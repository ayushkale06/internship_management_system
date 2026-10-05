import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Feature 1: Route Protection & Role-Based Access Control
    if (path.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (path.startsWith("/faculty") && token?.role !== "faculty") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (path.startsWith("/company") && token?.role !== "company") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (path.startsWith("/dashboard") && token?.role !== "student") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      // Must return true for the middleware to allow execution or trigger the redirect logic
      authorized: ({ token }) => !!token,
    },
  }
);

// Apply middleware to these highly protected system routes
export const config = {
  matcher: ["/admin/:path*", "/faculty/:path*", "/company/:path*", "/dashboard/:path*"],
};
