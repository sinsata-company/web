import { ChatDto } from '@/app/api/data'
import { useEffect, useState } from 'react'

const ChatInform = ({ chat }: { chat: ChatDto | null }) => {
  const [elapsedTime, setElapsedTime] = useState<string>('')

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
      <div className="text-center px-3 text-neutral-500 text-sm font-normal font-['Pretendard Variable'] leading-tight">
        상담 정보를 불러오는 중입니다...
      </div>
    )
  }
  return chat.status === 'END' ? (
    <div className="text-center px-3 text-neutral-500 text-sm font-normal font-['Pretendard Variable'] leading-tight">
      상담이 종료되었습니다.
    </div>
  ) : chat.status === 'PROGRESS' ? (
    <div className="text-center px-3 text-neutral-500 text-sm font-normal font-['Pretendard Variable'] leading-tight">
      {elapsedTime} 상담 중
    </div>
  ) : (
    <div className="text-center px-3 text-neutral-500 text-sm font-normal font-['Pretendard Variable'] leading-tight">
      안녕하세요 신사타 입니다.
      <br /> 선생님께서 입장하시면 10초마다 1400원씩 과급됩니다.
      <br /> 입장 전까지 비용이 청구되지 않으며, 채팅 입력이 불가합니다.
      <br /> 욕설 및 비방, 선생님에게 상처를 주는 대화는 삼가해 주세요.
    </div>
  )
}

ChatInform.__isStatic = true
export default ChatInform
