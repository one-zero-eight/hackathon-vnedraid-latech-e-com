import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Add paths that don't require authentication
const publicPaths = ['/auth']

export function middleware(request: NextRequest) {
  // const token = request.cookies.get('token')?.value
  // const { pathname } = request.nextUrl

  // // Allow public paths
  // if (publicPaths.includes(pathname)) {
  //   return NextResponse.next()
  // }

  // // Check if user is authenticated
  // if (!token) {
  //   const url = new URL('/auth', request.url)
  //   return NextResponse.redirect(url)
  // }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)'
  ]
}
