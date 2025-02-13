'use client'

import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'

export default function GroupChatItem() {
  const router = useRouter()
  return (
    <Button
      buttonType={BUTTON_TYPE.primary}
      label="그룹 채팅하러가기"
      onClick={() => {
        router.push('/chats/group/sinjeom')
      }}
    />
  )
}
