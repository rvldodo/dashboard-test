import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
	if (req.nextUrl.pathname === "/") {
		return NextResponse.redirect(new URL("/sign-in", req.url));
	}
	const res = NextResponse.next();
	return res;
};

export const config = {
	matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
