import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

 
// This function can be marked `async` if using `await` inside
export  async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedPath = path==='/Dashboard'||path === '/Bookmarks' || path === '/Analytics';
  const isPublicPath = path === '/login' || path === '/signup';
  // const token = request.cookies.get('token')?.value || '';
  const token = await getToken({
    req:request,
    secret:process.env.NEXTAUTH_SECRET
  })

  if(!token  && isProtectedPath){
    return NextResponse.redirect(new URL('/login',request.nextUrl));
  }
  if(token && isPublicPath){
    return NextResponse.redirect(new URL('/Dashboard',request.nextUrl));
  }
  return NextResponse.next();

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