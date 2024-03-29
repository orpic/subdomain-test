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

  //   console.log("Incoming request URL:", url.toString());

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) {
    // console.log("Skipping public file or Next.js internal file.");
    return;
  }

  const host = req.headers.get("host");
  //   console.log("Incoming request host:", host);

  const subdomain = getValidSubdomain(host);
  console.log("Detected subdomain:", subdomain);

  if (subdomain && host) {
    // Subdomain available, appending as query parameter
    const hostWithoutSubdomain = host.replace(`${subdomain}`, "subdomain");
    // Update the URL with the modified host
    url.hostname = hostWithoutSubdomain;
    console.log("hostWithoutSubdomain", hostWithoutSubdomain);
    url.searchParams.set("subdomain", subdomain);
    console.log("Subdomain parameter added to URL:", url.toString());
  }

  console.log("Rewriting URL:", url.toString());
  return NextResponse.rewrite(url);
}

export default middleware;
