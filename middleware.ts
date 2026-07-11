import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "./auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin')
  const isOnLogin = req.nextUrl.pathname.startsWith('/admin/login')

  if (isOnAdmin && !isOnLogin) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
    }
  }

  if (isOnLogin && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
