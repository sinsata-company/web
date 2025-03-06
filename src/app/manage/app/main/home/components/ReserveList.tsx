'use client'

import { ReserveDto } from '@/app/api/data'
import moment from 'moment'
import { useRouter } from 'next/navigation'

interface ReserveListProps {
  reserves: ReserveDto[]
}

const ReserveList = ({ reserves }: ReserveListProps) => {
  const router = useRouter()

  // startAt 기준 오름차순 정렬 (예약 시간이 빠른 순으로)
  const sortedReserves = reserves.slice().sort((a, b) => {
    return new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
  })

  return (
    <div className="inline-flex flex-col gap-2 w-full cursor-pointer">
      {sortedReserves.map((reserve, index) => {
        // 예약 상태에 따라 텍스트와 배경색 결정
        const consultationText = reserve.endAt == null
          ? '실시간 채팅 요청'
          : reserve.reserveType === 'CALL'
          ? '전화 상담'
          : '채팅 상담'
        
        const textColorClass =
          reserve.endAt == null
            ? 'text-red-600' // 실시간 채팅 요청일 때 (원하는 경우 변경 가능)
            : reserve.reserveType === 'CALL'
            ? 'text-[#E62419]' // 전화 상담 시
            : 'text-[#21499C]' // 채팅 상담 시
        
        const containerBgClass =
          reserve.endAt == null
            ? 'bg-red-600/10'
            : reserve.reserveType === 'CALL'
            ? 'bg-[#E62419]/10'
            : 'bg-[#21499C]/10'

        return (
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
                <div className="text-gray-400 text-sm font-bold leading-tight">
                  {moment(reserve.startAt).format('a h시 mm분')}
                  {reserve.endAt
                    ? ` - ${moment(reserve.endAt).format('a h시 mm분')}`
                    : ''}
                </div>
              </div>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation()
                if (reserve.reserveType === 'CHAT') {
                  router.push('/manage/app/chats/' + reserve.chatroomId)
                } else {
                  router.push('/manage/app/reserves/' + reserve.id)
                }
              }}
              className={`${containerBgClass} p-2 rounded-full flex items-center gap-1 cursor-pointer`}
            >
              <div className={`${textColorClass} text-base font-bold leading-tight`}>
                {consultationText}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ReserveList
