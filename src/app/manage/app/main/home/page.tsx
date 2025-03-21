
import AdviseStatus from './components/AdviseStatus'
import AdvisorReserves from './components/AdvisorReserves'
import AdvisorSummary from './components/AdvisorSummary'

export default function Page() {
  // 현재 날짜를 기준으로 과거 날짜 비활성화
  const disablePastDates = false;

  return (
    <div className="flex flex-col gap-8 w-full pb-5">
      <AdviseStatus />
      <AdvisorSummary />
      <AdvisorReserves disablePastDates={disablePastDates} />
    </div>
  )
}
