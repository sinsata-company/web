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
          statusCode: 301,
      },
    ];
  },

  rewrites: async () => [
    {
      source: '/v1/nid/me', // url이 source에 해당될 경우
      destination:
        'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code?client_id=jhsF1FFbQfwtnFulzCl4', // destination으로 redirect
    },
  ],
}

export default nextConfig
