// ─── Route Protection Proxy (Next.js 16) ─────────────────────────────────────
// NOTE: In Next.js 16, `middleware.ts` was renamed to `proxy.ts` and the
// exported function changed from `middleware` → `proxy`.
//
// Access Control Matrix:
// ┌─────────────────────────┬──────────────────────────────────────────┐
// │ Route pattern           │ Allowed roles                            │
// ├─────────────────────────┼──────────────────────────────────────────┤
// │ /admin/*                │ ROLE_ADMIN                               │
// │ /staff/*                │ ROLE_STAFF, ROLE_ADMIN                   │
// │ /deposit/*, /profile/*, │ ROLE_CUSTOMER, ROLE_STAFF, ROLE_ADMIN   │
// │ /checkout/*             │ (any authenticated user)                 │
// └─────────────────────────┴──────────────────────────────────────────┘

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ── JWT Payload shape (claims we use) ─────────────────────────────────────────
interface JWTPayload {
  sub: string;
  role: 'ROLE_CUSTOMER' | 'ROLE_STAFF' | 'ROLE_ADMIN';
  exp: number;
}

/**
 * Decode the JWT payload without signature verification.
 * Full verification happens on the backend; here we only need the role claim
 * for routing decisions.
 */
function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    // Pad base64url to standard base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = Buffer.from(base64, 'base64').toString('utf-8');
    const decoded = JSON.parse(json) as JWTPayload;

    // Check token expiry
    if (decoded.exp && decoded.exp * 1000 < Date.now()) return null;

    return decoded;
  } catch {
    return null;
  }
}

/**
 * Read the Bearer token from either the Authorization header or the
 * `access_token` HTTP-only cookie set by the server on SSR login.
 */
function getToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return req.cookies.get('access_token')?.value ?? null;
}

function redirectToLogin(req: NextRequest): NextResponse {
  const loginUrl = new URL('/login', req.url);
  loginUrl.searchParams.set('redirect', req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

function redirectToForbidden(req: NextRequest): NextResponse {
  return NextResponse.redirect(new URL('/403', req.url));
}

// ── Main Proxy Handler ────────────────────────────────────────────────────────

export function proxy(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;

  const token = getToken(req);
  const payload = token ? decodeJWT(token) : null;

  // ── /admin/* → ROLE_ADMIN only ─────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (!payload) return redirectToLogin(req);
    if (payload.role !== 'ROLE_ADMIN') return redirectToForbidden(req);
    return NextResponse.next();
  }

  // ── /staff/* → ROLE_STAFF or ROLE_ADMIN ───────────────────────────────────
  if (pathname.startsWith('/staff')) {
    if (!payload) return redirectToLogin(req);
    if (payload.role !== 'ROLE_STAFF' && payload.role !== 'ROLE_ADMIN') {
      return redirectToForbidden(req);
    }
    return NextResponse.next();
  }

  // ── /deposit/*, /profile/*, /checkout/* → any authenticated user ──────────
  const authRequired = ['/deposit', '/profile', '/checkout'];
  if (authRequired.some((prefix) => pathname.startsWith(prefix))) {
    if (!payload) return redirectToLogin(req);
    return NextResponse.next();
  }

  // ── Public routes – allow through ─────────────────────────────────────────
  return NextResponse.next();
}

// ── Matcher: only intercept the protected route families ──────────────────────
export const config = {
  matcher: [
    '/admin/:path*',
    '/staff/:path*',
    '/deposit/:path*',
    '/profile/:path*',
    '/checkout/:path*',
  ],
};
