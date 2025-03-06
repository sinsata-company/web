'use client'

import { ReserveDto } from '@/app/api/data'
import moment from 'moment'
import { useRouter } from 'next/navigation'

interface ReserveListProps {
  reserves: ReserveDto[]
}

const ReserveList = ({ reserves }: ReserveListProps) => {
  const router = useRouter()

  // 필터 제거: 실시간 채팅이 아닌 경우도 모두 표시
  // (즉, 5분이 지나도 표시)
  const filteredReserves = reserves

  // 정렬 규칙:
  // 1) 실시간 채팅(endAt == null) 먼저
  // 2) 실시간 채팅끼리는 startAt 내림차순(가장 최근이 맨 위)
  // 3) 그 외(전화, 일반 채팅)는 startAt 오름차순
  const sortedReserves = filteredReserves.slice().sort((a, b) => {
    const aIsLive = a.endAt == null
    const bIsLive = b.endAt == null

    // 둘 중 하나만 실시간 채팅일 경우, 실시간이 위로
    if (aIsLive && !bIsLive) return -1
    if (!aIsLive && bIsLive) return 1

    // 둘 다 실시간 채팅이면 startAt 내림차순
    if (aIsLive && bIsLive) {
      return new Date(b.startAt).getTime() - new Date(a.startAt).getTime()
    }

    // 둘 다 실시간 채팅 아니면 startAt 오름차순
    return new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
  })

  return (
    <div className="inline-flex flex-col gap-2 w-full cursor-pointer">
      {sortedReserves.map((reserve) => {
        const isLiveChat = reserve.endAt == null
        const isCall = reserve.reserveType === 'CALL'
        const isChat = reserve.reserveType === 'CHAT'

        // 표시용 텍스트
        const consultationText = isLiveChat
          ? '실시간 채팅 요청'
          : isCall
          ? '전화 상담'
          : '채팅 상담'
        
        // 색상 스타일
        const textColorClass = isLiveChat
          ? 'text-red-600'
          : isCall
          ? 'text-[#E62419]'
          : 'text-[#21499C]'

        const containerBgClass = isLiveChat
          ? 'bg-red-600/10'
          : isCall
          ? 'bg-[#E62419]/10'
          : 'bg-[#21499C]/10'

        /**
         * 실시간 채팅만 UTC로 들어온다고 가정하고
         * moment.utc(...).add(9, 'hours') 형태로 변환
         * 그 외(CALL, CHAT)는 그대로 표시
         */
        const startTime = isLiveChat
          ? moment.utc(reserve.startAt).add(9, 'hours').format('a h시 mm분')
          : moment(reserve.startAt).format('a h시 mm분')

        const endTime = reserve.endAt
          ? isLiveChat
            ? moment.utc(reserve.endAt).add(9, 'hours').format('a h시 mm분')
            : moment(reserve.endAt).format('a h시 mm분')
          : ''

        return (
          <div
            key={reserve.id}
            onClick={() => router.push('/manage/app/reserves/' + reserve.id)}
            className="h-20 p-4 bg-neutral-50 rounded-2xl border border-zinc-100 flex items-center gap-3"
          >
            <div className="flex-grow flex flex-col justify-center gap-2">
              <div className="text-zinc-900 text-base font-bold">
                고객명 : {reserve.customerName}
              </div>
              <div className="flex items-center gap-1">
                <div className="text-gray-400 text-sm font-bold leading-tight">
                  {startTime}
                  {endTime ? ` - ${endTime}` : ''}
                </div>
              </div>
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation()
                // 채팅 상담만 별도 경로로 이동
                if (isChat) {
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
