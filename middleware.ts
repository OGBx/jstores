import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifyAdminSession } from '@/lib/admin-auth';

export async function middleware(request: NextRequest) {
  const loggedIn = await verifyAdminSession(request.cookies.get(ADMIN_COOKIE)?.value);
  const loginPath = request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname === '/api/admin/login';
  if (!loggedIn && !loginPath) {
    const url = new URL('/admin/login', request.url);
    url.searchParams.set('next', request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }
  if (loggedIn && request.nextUrl.pathname === '/admin/login') return NextResponse.redirect(new URL('/admin', request.url));
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };
