import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/ads/create")) {
        const userId = req.cookies.get("userId")?.value;
        if (!userId) {
        return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/ads/create"],
};