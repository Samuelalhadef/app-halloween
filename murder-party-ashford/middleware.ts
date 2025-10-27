import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

// Routes qui nécessitent une authentification
const protectedRoutes = ['/dashboard', '/game', '/characters', '/clues', '/timeline', '/accusation'];

// Routes accessibles uniquement quand on n'est PAS connecté
const authRoutes = ['/login'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Vérifier si la route est protégée
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Si on essaie d'accéder à une route protégée sans être connecté
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Si on essaie d'accéder à login/register alors qu'on est déjà connecté
  if (isAuthRoute && token) {
    // Vérifier que le token est valide
    const user = verifyToken(token);
    if (user) {
      return NextResponse.redirect(new URL('/game', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
