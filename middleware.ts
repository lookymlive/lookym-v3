// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  try {
    const session = await auth();
    const pathname = new URL(request.url).pathname;

    // If not authenticated and trying to access protected routes
    if (!session && (pathname.startsWith('/admin') || pathname.startsWith('/store') || pathname.startsWith('/profile'))) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Admin routes protection
    if (pathname.startsWith('/admin') && session?.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Store routes protection
    if (pathname.startsWith('/store') && !['store', 'admin'].includes(session?.user.role || '')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/store/:path*', '/profile/:path*']
}