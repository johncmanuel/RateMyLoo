import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	// Clone the request headers and set a new header
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set(
		"Access-Control-Allow-Origin",
		process.env.NEXT_PUBLIC_URL as string
	);
	requestHeaders.set(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	requestHeaders.set("Access-Control-Allow-Headers", "Authorization");

	// Set request headers in NextResponse.rewrite
	const response = NextResponse.next({
		request: {
			// New request headers
			headers: requestHeaders,
		},
	});

	return response;
}
