import BTB from '@/components/common/Btb'
import AdvisorContainer from './components/AdvisorContainer'
import BannersAndStatics from './components/HomeTopUI'
import AdCarousel from './components/AdCarousel'
import MainAppbar from '@/components/common/MainAppbar'

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
