import BTB from '@/components/common/Btb'
import MainAppbar from '@/components/common/MainAppbar'
import CashSummary from './components/CashSummary'
import MyAdvisor from './components/MyAdvisor'

export default function MyPage() {
  return (
    <div>
      <MainAppbar />
      <CashSummary />
      <div className="h-4"></div>
      <MyAdvisor />
      <BTB />
    </div>
  )
}
