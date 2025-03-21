import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // POST 요청이 /chats/inquiry/list로 오면 GET 요청으로 리다이렉트
  if (request.method === 'POST' && request.nextUrl.pathname === '/chats/inquiry/list') {
    const url = request.nextUrl.clone()
    const response = NextResponse.redirect(new URL(url.pathname, url.origin), 303)

    // CORS 헤더 추가
    response.headers.set('Access-Control-Allow-Origin', request.headers.get('origin') || '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Allow-Credentials', 'true')

    return response
  }

  // OPTIONS 요청 처리
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 })
    response.headers.set('Access-Control-Allow-Origin', request.headers.get('origin') || '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/chats/inquiry/list']
}