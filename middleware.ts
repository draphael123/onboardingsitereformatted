import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// Routes that require authentication
const protectedRoutes = ["/app", "/admin"]

// Routes only for admin
const adminRoutes = ["/admin"]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Get the token from the session
  const token = await getToken({ 
    req, 
    secret: process.env.AUTH_SECRET 
  })
  
  const isLoggedIn = !!token
  const userRole = token?.role as string | undefined

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )
  const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route)
  )
  const isAuthRoute = pathname === "/login"

  // Redirect logged-in users away from login page
  if (isAuthRoute && isLoggedIn) {
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url))
    }
    return NextResponse.redirect(new URL("/app", req.url))
  }

  // Protect authenticated routes
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Protect admin routes
  if (isAdminRoute && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/app", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all routes except static files and api routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

