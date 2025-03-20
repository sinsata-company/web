import { ChatDto } from '@/app/api/data'
import { endChat } from '@/app/manage/api/homepage'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const ChatInform = ({ chat }: { chat: ChatDto | null }) => {
  const [elapsedTime, setElapsedTime] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (chat?.status !== 'PROGRESS' || !chat.startAt) return

    const startAtDate = new Date(chat.startAt)
    if (isNaN(startAtDate.getTime())) {
      console.error('Invalid startAt date:', chat.startAt)
      return
    }

    const interval = setInterval(() => {
      const now = new Date()
      const diff = Math.floor((now.getTime() - startAtDate.getTime()) / 1000)
      const minutes = Math.floor(diff / 60)
      const seconds = diff % 60
      setElapsedTime(`${minutes}분 ${seconds}초`)
    }, 1000)

    return () => clearInterval(interval)
  }, [chat])

  if (!chat) {
    return (
      <div className="text-center px-3 text-neutral-500 text-sm font-normal  leading-tight">
        상담 정보를 불러오는 중입니다...
      </div>
    )
  }
  return (
    <div className="w-full text-neutral-500 text-xs font-normal">
      {/* 알림 메시지 */}
      <div className="space-y-2">
        <div className="bg-gray-100 p-3 rounded-lg">
          <span className="text-red-500">⚠️ 개인정보요청 및 직거래요구</span> 등 신사타 이용 정책에 위반되는 대화 시 이용이 제한 될 수 있습니다.
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <span className="text-red-500">⚠️ 판매자의 상품에 대한 문의만 가능</span>하며, 관련 없는 내용에 대한 질문은 하실 수 없습니다.
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          ⚠️ 채팅 메시지는 최대 6개월까지만 확인하실 수 있습니다.
        </div>
      </div>
    </div>
  )
}

ChatInform.__isStatic = true
export default ChatInform
