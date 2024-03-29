/* eslint-disable consistent-return */
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getValidSubdomain } from "./utils";

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

async function middleware(req: NextRequest) {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) return;

  const host = req.headers.get("host");
  const subdomain = getValidSubdomain(host);

  if (subdomain) {
    // Subdomain available, appending as query parameter
    url.searchParams.set("subdomain", subdomain);
  }

  return NextResponse.rewrite(url);
}

export default middleware;
