import { CashHistoryDto } from '@/app/api/data'
import moment from 'moment'

const ChargeHistoryItem = ({ coin, createdAt, price }: CashHistoryDto) => {
  return (
    <div className="w-full bg-white rounded-xl justify-start items-center gap-4 inline-flex">
      <div className="grow shrink basis-0 flex-col justify-center items-start gap-1 inline-flex">
        <div className="text-zinc-900 text-base font-bold  leading-snug">
          {price} 캐시 구매
        </div>
        <div className="text-zinc-400 text-xs font-normal  leading-none">
          {moment(createdAt).format('YYYY.MM.DD HH:mm:ss')}
        </div>
      </div>
      <div className="px-4 py-3 bg-red-600/10 rounded-xl justify-start items-center gap-3 flex overflow-hidden">
        <div className="text-red-600 text-base font-medium ">₩</div>
        <div className="text-red-600 text-base font-bold ">{coin}</div>
      </div>
    </div>
  )
}

export default ChargeHistoryItem
