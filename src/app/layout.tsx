import type { Metadata } from 'next'
import './globals.css'
import Main from './Main';

export const metadata: Metadata = {
  title: '신사타',
  description: '신사타 | 심리 사주 타로 상담 커뮤니티',
  verification: {
    naver: [
      'd5cbe4cc3ead7ff00b35d193bfa3ef45a1b08e87',
      '0c0d649acea321e0fc6765f7f2df6044d68b5d34',
    ],
    google: '_UKMZd5tDpoNaGWD7AtZ70PnqoYg367BAnGT57VV_-U',
  },
  icons: {
    shortcut: 'https://www.sinsata.co.kr/images/favicon_.ico',
  },
  alternates: {
    canonical: 'https://www.sinsata.co.kr/',
  },
  robots: 'index,follow',
  subject: '신사타',
  author: '신사타',
  keywords: ['신사타'],
  openGraph: {
    type: 'website',
    rich_attachment: 'true',
    site_name: '신사타',
    title: '신사타',
    description:
      '검증된 선생님들만 모신 오늘의운세, 띠별운세, 신사타에서 확인해 보세요.',
    images: [
      {
        url: 'https://www.sinsata.co.kr/images/og.png',
      },
    ],
    url: 'https://www.sinsata.co.kr/',
  },
  twitter: {
    card: 'summary_large_image',
    title: '신사타',
    description:
      '검증된 선생님들만 모신 오늘의운세, 띠별운세, 신사타에서 확인해 보세요.',
    images: [
      {
        url: 'https://www.sinsata.co.kr/images/og.png',
      },
    ],
  },
  other: {
    'itemProp:name': '신사타',
    'itemProp:description':
      '검증된 선생님들만 모신 오늘의운세, 띠별운세, 신사타에서 확인해 보세요.',
    'itemProp:image': 'https://www.sinsata.co.kr/images/og.png',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Main>{children}</Main>
      </body>
    </html>
  );
}
