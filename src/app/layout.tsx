import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '신사타',
  description: '신사타 | 심리 사주 타로 상담 커뮤니티',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <meta
        name="naver-site-verification"
        content="d5cbe4cc3ead7ff00b35d193bfa3ef45a1b08e87"
      />
      <meta
        name="naver-site-verification"
        content="0c0d649acea321e0fc6765f7f2df6044d68b5d34"
      />
      <meta
        name="google-site-verification"
        content="_UKMZd5tDpoNaGWD7AtZ70PnqoYg367BAnGT57VV_-U"
      />
      <link
        rel="shortcut icon"
        href="https://www.sinsata.co.kr/images/favicon_.ico"
      />
      <link rel="canonical" href="https://www.sinsata.co.kr/" />
      <meta name="robots" content="index,follow" />
      <meta name="subject" content="신사타" />
      <meta name="title" content="신사타" />
      <meta name="author" content="신사타" />
      <meta
        name="description"
        content="검증된 선생님들만 모신 오늘의운세, 띠별운세, 신사타에서 확인해 보세요."
      />
      <meta name="keywords" content="신사타" />

      <meta property="og:type" content="website" />
      <meta property="og:rich_attachment" content="true" />
      <meta property="og:site_name" content="신사타" />
      <meta property="og:title" content="신사타" />
      <meta
        property="og:description"
        content="검증된 선생님들만 모신 오늘의운세, 띠별운세, 신사타에서 확인해 보세요."
      />
      <meta
        property="og:image"
        content="https://www.sinsata.co.kr/images/og.png"
      />
      <meta property="og:url" content="https://www.sinsata.co.kr/" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="신사타" />
      <meta
        name="twitter:description"
        content="검증된 선생님들만 모신 오늘의운세, 띠별운세, 신사타에서 확인해 보세요."
      />
      <meta
        name="twitter:image"
        content="https://www.sinsata.co.kr/images/og.png"
      />

      <meta itemProp="name" content="신사타" />
      <meta
        itemProp="description"
        content="검증된 선생님들만 모신 오늘의운세, 띠별운세, 신사타에서 확인해 보세요."
      />
      <meta
        itemProp="image"
        content="https://www.sinsata.co.kr/images/og.png"
      />
      <title>신사타</title>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative w-full h-full max-w-[550px] mx-auto`}
      >
        <div className="relative">{children}</div>
      </body>
    </html>
  )
}
