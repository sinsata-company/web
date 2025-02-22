'use client'

import { ReserveDto } from '@/app/api/data'
import moment from 'moment'
import { useRouter } from 'next/navigation'

interface ReserveListProps {
  reserves: ReserveDto[]
}

const ReserveList = ({ reserves }: ReserveListProps) => {
  const router = useRouter()
  return (
    <div className="inline-flex flex-col gap-2 w-full">
      {reserves.map((reserve, index) => (
        <div
          key={index}
          onClick={() => router.push('/manage/app/reserves/' + reserve.id)}
          className="h-20 p-4 bg-neutral-50 rounded-2xl border border-zinc-100 flex items-center gap-3"
        >
          <div className="flex-grow flex flex-col justify-center gap-2">
            <div className="text-zinc-900 text-base font-bold">
              고객명 : {reserve.customerName}
            </div>
            <div className="flex items-center gap-1">
              <div className="text-yellow-400 text-sm font-bold leading-tight">
                {moment(reserve.startAt).format('a h시 mm분')}
                {reserve.endAt
                  ? ` -
                ${moment(reserve.endAt).format('a h시 mm분')}`
                  : ''}
              </div>
            </div>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation()
              if (reserve.reserveType == 'CHAT') {
                router.push('/manage/app/chats/' + reserve.chatroomId)
              } else {
                router.push('/manage/app/reserves/' + reserve.id)
              }
            }}
            className="p-2 bg-red-600/10 rounded-full flex items-center gap-1"
          >
            <div className="text-red-600 text-base font-bold leading-tight">
              {reserve.endAt == null
                ? '실시간 채팅 요청'
                : reserve.reserveType == 'CALL'
                ? '전화 상담'
                : '채팅 상담'}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReserveList
