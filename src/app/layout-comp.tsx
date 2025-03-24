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
  // 서버 사이드 렌더링 중에는 기본값 사용
  const defaultFontFamily = 'font-sans';
  const defaultFontSize = 'text-base';
  
  // 클라이언트 사이드에서만 useAppContext 값 사용
  const appContext = useAppContext();
  const fontFamily = appContext?.fontFamily || defaultFontFamily;
  const fontSize = appContext?.fontSize || defaultFontSize;
  
  return (
    <div
      className={`${fontFamily} ${fontSize} antialiased w-full max-w-[550px] mx-auto overflow-x-hidden overflow-y-auto`}
    >
      <div className="relative h-[100dvh]">{children}</div>
      {/* <UsageFooter /> */}
    </div>
  )
}
