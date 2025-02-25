'use client'

import { getMyInfo, updateprofile } from '@/app/api/user'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Input from '@/components/common/Input'
import { UserDto } from '@/types/user'
import { useEffect, useState } from 'react'

export default function Page() {
  const [nickname, setNickname] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [me, setMe] = useState<UserDto | null>(null)

  useEffect(() => {
    reload()
  }, [])
  const reload = () => {
    getMyInfo().then((res) => {
      setMe(res)
      setNickname(res.nickname)
      setPhoneNumber(res.phoneNum)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <Input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        name="닉네임"
        placeholder="닉네임을 입력해주세요."
      />
      <Input
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        name="전화번호"
        placeholder="전화번호 입력해주세요."
      />
      <Button
        label="수정하기"
        onClick={async () => {
          await updateprofile({ nickname, phoneNum: phoneNumber })
          reload()
        }}
        buttonType={BUTTON_TYPE.primary}
      />
    </div>
  )
}
