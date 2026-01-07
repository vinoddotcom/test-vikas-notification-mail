import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // If user is authenticated, allow the request
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

// Protect these routes
export const config = {
    matcher: [
        "/send-email/:path*",
        "/api/send-email/:path*",
    ],
};
