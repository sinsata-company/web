import AdviseStatus from './components/AdviseStatus'
import AdvisorReserves from './components/AdvisorReserves'
import AdvisorSummary from './components/AdvisorSummary'

export default function Page() {
  return (
    <div className="flex flex-col gap-8 w-full pb-5">
      <AdviseStatus />
      <AdvisorSummary />
      <AdvisorReserves />
    </div>
  )
}
