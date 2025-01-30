'use client'

import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Input from '@/components/common/Input'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-8 w-full">
      <Input
        name="아이디"
        placeholder="이메일을 입력해주세요"
        value=""
        onChange={() => {}}
      />
      <Input
        name="비밀번호"
        placeholder="이메일을 입력해주세요"
        value=""
        onChange={() => {}}
      />
      <Button
        buttonType={BUTTON_TYPE.primary}
        label="로그인"
        onClick={() => {
          router.replace('/manage/app/main/home')
        }}
      />
    </div>
  )
}
