import BackAppbar from '@/components/common/BackAppbar'
import ReserveTime from './components/ReserveTimeSelector'
import { GreyDivider } from '@/components/common/Divider'
import RserveHourSelector from './components/ReserveHourSelector'
import ReserveCashSummary from './components/ReserveCashSummary'
import { Button, BUTTON_TYPE } from '@/components/common/Button'

export default function TeacherReservePage() {
  return (
    <div>
      <BackAppbar />
      <div className="py-4">
        <ReserveTime />
      </div>
      <GreyDivider />
      <RserveHourSelector />
      <GreyDivider />
      <ReserveCashSummary />
      <div className="h-6"></div>
      <div className="px-4 py-12">
        <Button buttonType={BUTTON_TYPE.primary} label="예약하기" />
      </div>
    </div>
  )
}
