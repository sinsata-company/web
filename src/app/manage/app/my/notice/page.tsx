'use client'

import { updateNotice } from '@/app/manage/api/mypage'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import ImageInput from '@/components/common/ImageInput'
import Input from '@/components/common/Input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const [value, setValue] = useState('')
  const [images, setImages] = useState<string[]>([])
  const router = useRouter()

  return (
    <div className="inline-flex flex-col gap-8 w-full">
      <Input
        name="공지사항"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        textarea
        lines={10}
        useCounter
        maxLength={1000}
      />
      <ImageInput
        images={images}
        count={3}
        onDelete={(index) => {
          setImages(images.filter((_, i) => i !== index))
        }}
        onUploadedImage={(url) => {
          setImages([...images, url])
        }}
      />
      <Button
        buttonType={BUTTON_TYPE.primary}
        label="저장하기"
        onClick={async () => {
          await updateNotice(value, JSON.stringify(images))
          router.back()
        }}
      />
    </div>
  )
}
