'use client'

import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'

export default function GroupChatItem() {
  const router = useRouter()
  return (
    <div
      onClick={() => {
        router.push('/chats/group/sinjeom')
      }}
      className={clsx(
        'w-full px-2 py-3 bg-red-600/10 rounded-xl flex-col justify-center items-center gap-1 inline-flex'
      )}
      style={{
        borderRadius: 12,
        background:
          'var(--Gradient-1, linear-gradient(121deg, #F9C00F 3.88%, #E62419 59.99%, #21499C 115.85%))',
      }}
    >
      <div
        className={clsx(
          "text-base text-white font-bold font-['Pretendard Variable'] leading-tight"
        )}
      >
        그룹 채팅하러가기
      </div>
    </div>
  )
}
