'use client'

import { updateVas } from '@/app/manage/api/mypage'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import ImageInput from '@/components/common/ImageInput'
import Input from '@/components/common/Input'
import { useRouter } from 'next/navigation'

import { useState } from 'react'

export default function Page() {
  const [name, setName] = useState<string>('')
  const [details, setDetails] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [images, setImages] = useState<string[]>([])

  const router = useRouter()
  return (
    <div className="flex flex-col gap-5">
      <Input
        name="상품명"
        placeholder="상품명을 입력해주세요"
        value={name}
        maxLength={20}
        useCounter
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        name="상품 설명"
        placeholder="상품명을 입력해주세요"
        value={details}
        lines={3}
        textarea
        maxLength={500}
        useCounter
        onChange={(e) => setDetails(e.target.value)}
      />
      <Input
        name="가격"
        type="number"
        placeholder="상품명을 입력해주세요"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <ImageInput
        count={1}
        onDelete={(idx) => {}}
        onUploadedImage={(images) => {
          setImages([images])
        }}
        images={images}
      />
      <Button
        buttonType={BUTTON_TYPE.primary}
        label="등록"
        onClick={() => {
          updateVas({
            name,
            details,
            price,
            image: images[0],
          })
          router.back()

          console.log(name, details, price, images)
        }}
      />
    </div>
  )
}
