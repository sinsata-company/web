import { InfoItem } from '../hashtag/page'
import TimeTabs from './components/TimeTabs'

export default function Page() {
  return (
    <div>
      <TimeTabs />
      <div className="flex flex-col gap-2">
        <InfoItem text="시간 당 금액 설정은 최대 3개 가능합니다." />
      </div>
    </div>
  )
}
