import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
	// Handle root redirect
	if (req.nextUrl.pathname === "/") {
		return NextResponse.redirect(new URL("/sign-in", req.url));
	}

	// Handle proxy requests - add CORS headers
	if (req.nextUrl.pathname.startsWith("/api/proxy")) {
		const res = NextResponse.next();
		
		// Add CORS headers for proxy requests
		res.headers.set("Access-Control-Allow-Origin", "*");
		res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
		res.headers.set("X-Frame-Options", "ALLOWALL");
		res.headers.delete("Content-Security-Policy");
		
		return res;
	}

	const res = NextResponse.next();
	return res;
};

export const config = {
	matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
