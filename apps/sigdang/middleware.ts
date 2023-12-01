import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import user from './app/utils/User'
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (typeof window !== 'undefined' && window.localStorage) {

    const userCurreentTokern = JSON.parse(localStorage.getItem("user") || "");
    if(userCurreentTokern.userToken === user.userToken)
    {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  
  return NextResponse.redirect(new URL('/Login', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/Login/Cart','/Login/Order','/Login/Profile'],
}