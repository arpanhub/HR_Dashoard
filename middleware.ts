import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedPath = path==='/Dashboard'||path === '/Bookmarks' || path === '/Analytics';
  const isPublicPath = path === '/login' || path === '/signup';
  const token = request.cookies.get('token')?.value || '';

  if(!token  && isProtectedPath){
    return NextResponse.redirect(new URL('/login',request.nextUrl));
  }
  if(token && isPublicPath){
    return NextResponse.redirect(new URL('/Dashboard',request.nextUrl));
  }

}


export const config = {
  matcher: [
    '/',           
    '/login',
    '/signup',
    '/Dashboard',
    '/Bookmarks',
    '/Analytics'
  ]
}