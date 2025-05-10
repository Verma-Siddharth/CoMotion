import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth.js';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;

  console.log('Token:', token);
  const pathname = req.nextUrl.pathname;

  // Protected routes
  const userProtectedRoutes = ['/dashboard/user', '/api/user', '/api/ride/join'];
  const driverProtectedRoutes = ['/dashboard/driver', '/api/ride/create', '/api/ride/approve'];

  if (!token) {
    return NextResponse.redirect(new URL('/auth/user/login', req.url));
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.redirect(new URL('/auth/user/login', req.url));
  }

  // User trying to access driver routes
  if (decoded.role === 'user' && driverProtectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard/user', req.url));
  }

  // Driver trying to access user routes
  if (decoded.role === 'driver' && userProtectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard/driver', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // '/dashboard/:path*',
    // '/api/user/:path*',
    // '/api/ride/:path*',
  ],
};