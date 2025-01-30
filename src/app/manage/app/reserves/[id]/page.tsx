import BackAppbar from '@/components/common/BackAppbar'
import ReserveSummary from './components/ReserveSummary'
import ReserveStats from './components/ReserveStats'
import { GreyDivider } from '@/components/common/Divider'
import ReserveNotes from './components/ReserveNotes'
import ReserveHistory from './components/ReserveHistory'
import ReserveReview from './components/ReserveReview'

export default function Page() {
  return (
    <div>
      <BackAppbar />
      <ReserveSummary />
      <GreyDivider />
      <div className="inline-flex gap-5 flex-col px-5 w-full mb-24">
        <ReserveStats />
        <ReserveNotes />
        <ReserveHistory />
        <ReserveReview />
      </div>
    </div>
  )
}
