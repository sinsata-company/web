'use client'

import BTB from '@/components/common/Btb'
import MainAppbar from '@/components/common/MainAppbar'
import { SearchProvider } from '@/components/common/SearchContext'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const AdCarousel = dynamic(() => import('./components/AdCarousel'), { ssr: false })
const BannersAndStatics = dynamic(() => import('./components/HomeTopUI'), { ssr: false })
const AdvisorContainer = dynamic(() => import('./components/AdvisorContainer'), { ssr: false })

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <SearchProvider>
      <div>
        <MainAppbar />
        {isMounted ? (
          <>
            <AdCarousel />
            <BannersAndStatics />
            <div className="h-6"></div>
            <div className="h-6"></div>
            <AdvisorContainer />
          </>
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse text-gray-400">로딩 중...</div>
          </div>
        )}
        <BTB />
      </div>
    </SearchProvider>
  )
}
