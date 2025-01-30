'use client'

import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        src={'/images/sinsata_appbar_logo.svg'}
        width={120}
        height={28}
        alt="lgoo"
      />
      상담사 등록에 지원해주셔서 감사합니다.
      <br />
      내용 확인 후 연락드리겠습니다.
      <Button
        buttonType={BUTTON_TYPE.primary}
        label="확인"
        onClick={() => {
          router.back()
        }}
      />
    </div>
  )
}
