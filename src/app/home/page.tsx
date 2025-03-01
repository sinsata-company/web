'use client'

import BTB from '@/components/common/Btb'

import MainAppbar from '@/components/common/MainAppbar'

import dynamic from 'next/dynamic'

const AdCarousel = dynamic(() => import('./components/AdCarousel'), {
  ssr: false,
})
const BannersAndStatics = dynamic(() => import('./components/HomeTopUI'), {
  ssr: false,
})
const AdvisorContainer = dynamic(
  () => import('./components/AdvisorContainer'),
  {
    ssr: false,
  }
)

export default function HomePage() {
  return (
    <div>
      <MainAppbar />
      <AdCarousel />
      <BannersAndStatics />
      <div className="h-6"></div>
      <div className="h-6"></div>
      <AdvisorContainer />

      <BTB />
    </div>
  )
}
