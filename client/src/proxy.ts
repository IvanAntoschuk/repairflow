import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// optimistic redirect only; the API verifies the JWT signature
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasToken = Boolean(request.cookies.get("rf_token")?.value)

  if (pathname.startsWith("/adminPanel") && !hasToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  if (pathname === "/login" && hasToken) {
    return NextResponse.redirect(new URL("/adminPanel", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/adminPanel/:path*", "/login"],
}
