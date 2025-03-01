'use client'

import { updateHash } from '@/app/manage/api/mypage'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Input from '@/components/common/Input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const [value, setValue] = useState('')
  const [hashtags, setHashtags] = useState<string[]>([])

  const router = useRouter()
  return (
    <div className="inline-flex flex-col gap-8 w-full">
      <Input
        useSuffix
        name="해시태그"
        placeholder="입력 후 등록을 눌러주세요."
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onClickSuffix={() => {
          if (hashtags.includes(value)) {
            setValue('')
            return
          }
          if (hashtags.length >= 5) {
            return
          }
          setHashtags([...hashtags, '#' + value])
          setValue('')
        }}
      />
      <div className="gap-2 inline-flex">
        {hashtags.map((tag) => (
          <div
            key={tag}
            className="h-9 px-3 py-2 bg-red-600/10 rounded-full justify-center items-center gap-1 inline-flex"
          >
            <div className="text-red-600 text-sm font-bold  leading-tight">
              {tag}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <InfoItem text="해시태그 입력 후 등록을 누르면 기존 태그가 사라지고 입력하신 태그로 교체돼요." />
        <InfoItem text="해시태그는 5개까지 입력 가능합니다." />
        <InfoItem text="해시태그를 입력함에 따라 고객들에게 추천 선생님으로 지목받을 확률이 올라가요." />
        <InfoItem text="적절한 태그 설정을 통해 지목받을 확률을 높여주세요." />
      </div>
      <Button
        buttonType={BUTTON_TYPE.primary}
        label="저장하기"
        onClick={async () => {
          await updateHash(hashtags.join(''))
          router.back()
        }}
      />
    </div>
  )
}

export const InfoItem = ({ text }: { text: string }) => {
  return (
    <div className=" items-center inline-flex">
      <img src="/images/ic_notification.svg" className="mr-1" />
      <div className="grow text-zinc-500 text-xs font-normal  leading-tight">
        {text}
      </div>
    </div>
  )
}
