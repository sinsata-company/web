import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['sinsata.s3.ap-northeast-2.amazonaws.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  redirects: async () => {
    return [
        {
          source: '/',
          destination: '/home',
          permanent: true,
        },
    ];
  },

  rewrites: async () => [
    {
      source: '/v1/nid/me',
      destination:
        'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code?client_id=jhsF1FFbQfwtnFulzCl4',
    },
  ],
  
  env: {
    NEXT_PUBLIC_FRONTEND_URL: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://www.sinsata.co.kr',
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080'
      : 'https://api.sinsata.co.kr',
  }
}

export default nextConfig