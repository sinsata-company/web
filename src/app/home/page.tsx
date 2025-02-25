import BTB from '@/components/common/Btb'
import AdvisorContainer from './components/AdvisorContainer'
import BannersAndStatics from './components/HomeTopUI'

export default function HomePage() {
  return (
    <div>
      {/* <MainAppbar /> */}
      {/* <AdCarousel /> */}
      <BannersAndStatics />
      <div className="h-6"></div>
      <div className="h-6"></div>
      <AdvisorContainer />

      <BTB />
    </div>
  )
}
