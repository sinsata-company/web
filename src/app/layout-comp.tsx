'use client'

import { AppProvider, useAppContext } from '@/context/AppContext'
import { Noto_Sans } from 'next/font/google'

const notoSans = Noto_Sans({
  subsets: ['latin'], // 서브셋 설정
  weight: ['400', '700'], // 사용할 폰트 굵기
  variable: '--font-noto-sans', // CSS 변수 지정 (선택 사항)
})

const fonts = [
  { name: 'Sans', className: 'font-sans' },
  { name: 'Serif', className: 'font-serif' },
  { name: 'Mono', className: 'font-mono' },
  { name: 'Pretendard', className: 'font-pretendard' },
]

const fontSizes = [
  { name: 'Small', className: 'text-sm' },
  { name: 'Base', className: 'text-base' },
  { name: 'Large', className: 'text-lg' },
  { name: 'XL', className: 'text-xl' },
]

export default function LayoutChild({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
      <LayoutContent>{children}</LayoutContent>
    </AppProvider>
  )
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { fontFamily, fontSize } = useAppContext() ?? {
    fontFamily: '',
    fontSize: '',
  }
  console.log(fontFamily, fontSize)
  return (
    <body
      className={` ${fontFamily} ${fontSize} antialiased relative w-full h-full max-w-[550px] mx-auto`}
    >
      <div className="relative">{children}</div>
      {/* <UsageFooter /> */}
    </body>
  )
}
