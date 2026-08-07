import { compare } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, createAdminSession } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get('email') || '').trim().toLowerCase();
  const password = String(form.get('password') || '');
  const configuredEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const valid = Boolean(configuredEmail && hash && email === configuredEmail && await compare(password, hash));
  if (!valid) return NextResponse.redirect(new URL('/admin/login?error=1', request.url), 303);
  const requestedNext = String(form.get('next') || '/admin');
  const next = requestedNext.startsWith('/admin') && !requestedNext.startsWith('//') ? requestedNext : '/admin';
  const response = NextResponse.redirect(new URL(next, request.url), 303);
  response.cookies.set(ADMIN_COOKIE, await createAdminSession(email), { httpOnly:true, secure:process.env.NODE_ENV==='production', sameSite:'lax', path:'/', maxAge:8*60*60 });
  return response;
}
