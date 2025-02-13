'use client'

import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'

export default function FindMyAdvisor() {
  const router = useRouter()
  return (
    <div
      className={clsx(
        'bottom-20 left-1/2 transform -translate-x-1/2 fixed w-full max-w-[550px] px-5'
      )}
    >
      <Button
        buttonType={BUTTON_TYPE.primary}
        label="내게 맞는 선생님 찾기"
        onClick={() => {
          router.push('/search')
        }}
      />
    </div>
  )
}
