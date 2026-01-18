import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// এখানে 'export default function' ব্যবহার করা হয়েছে যাতে Next.js এটি খুঁজে পায়
export default function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn');

  // ইউজার লগইন না থাকলে এবং /add-item পেজে যাওয়ার চেষ্টা করলে তাকে লগইন পেজে পাঠানো হবে
  if (!isLoggedIn && request.nextUrl.pathname.startsWith('/add-item')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// কোন কোন পেজে মিডলওয়্যার রান হবে
export const config = {
  matcher: ['/add-item/:path*'], 
};