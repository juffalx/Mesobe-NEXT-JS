import { NextResponse } from 'next/server';

const SESSION_ID = /^[0-9a-f-]{36}$/;

export function proxy(request) {
  const session = request.cookies.get('session')?.value;

  if (!session || !SESSION_ID.test(session)) {
    const url = new URL('/login', request.url);
    url.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*', '/orders/:path*', '/kitchen/:path*'],
};
