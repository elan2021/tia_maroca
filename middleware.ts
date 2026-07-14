import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "./auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin')
  const isOnAdminLogin = req.nextUrl.pathname.startsWith('/admin/login')
  const isOnMembros = req.nextUrl.pathname.startsWith('/membros')
  const isOnMembrosLogin = req.nextUrl.pathname.startsWith('/membros/login')

  if (isOnAdmin && !isOnAdminLogin) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
    }
  }

  if (isOnAdminLogin && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl))
  }

  if (isOnMembros && !isOnMembrosLogin) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/membros/login', req.nextUrl))
    }
  }

  if (isOnMembrosLogin && isLoggedIn) {
    return NextResponse.redirect(new URL('/membros', req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
