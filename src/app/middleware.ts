// NextResponse, 
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    console.log("someone saw some blogs or sth i dunno")
  // return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {
  matcher: '/blogs/*',
}