import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  
  console.log("executede")
  // const user =  request.cookies
  console.log(request.cookies);
  // if (typeof window !== 'undefined' && window.localStorage) {
  //   const userCurreentTokern = JSON.parse(localStorage.getItem("user") || "");
  //   console.log(userCurreentTokern.username);
  //   console.log("executede")
  //   if(userCurreentTokern.username)
  //   {
  //     return NextResponse.redirect(new URL('/', request.url))
  //   }
  //   else{

  //     return NextResponse.redirect(new URL('/Login', request.url))
  //   }
  // }
  
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/Login/Cart','/Login/Order','/Login/Profile'],
}