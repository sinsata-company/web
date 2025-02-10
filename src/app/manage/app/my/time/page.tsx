import { InfoItem } from '../hashtag/page'
import TimeTabs from './components/TimeTabs'

export default function Page() {
  return (
    <div>
      <TimeTabs />
      <div className="flex flex-col gap-2">
        <InfoItem text="상담 금액 변경을 원할 시 신사타 고객센터를 이용해주세요." />
        <InfoItem text="시간 당 금액 설정은 최대 3개 가능합니다." />
      </div>
    </div>
  )
}
