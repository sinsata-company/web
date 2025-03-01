'use client'

import { uploadToS3 } from '@/app/api/upload/awsS3'
import { useRef } from 'react'

interface ImageInputProps {
  count: number
  images: string[]
  onUploadedImage: (image: string) => void
  onDelete: (index: number) => void
}

export default function ImageInput({
  images,
  count,
  onDelete,

  onUploadedImage,
}: ImageInputProps) {
  const ref = useRef<HTMLInputElement>(null)
  const onClick = () => {
    if (images.length >= count) {
      return
    }
    ref.current?.click()
  }

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    const file = files[0]
    const url = await uploadToS3(file, file.type)

    if (!url) {
      return
    }

    onUploadedImage(url)
    e.target.value = ''
    e.target.files = null
  }

  return (
    <div className="h-36   overflow-hidden inline-flex gap-3">
      <div>
        <div
          onClick={onClick}
          className="cursor-pointer w-20 h-20  rounded-xl border border-stone-300 flex flex-col justify-center items-center gap-1"
        >
          <input
            onChange={onChange}
            type="file"
            accept="image/*"
            hidden
            ref={ref}
          />
          <img
            className="bg-black w-5 h-5 rounded-full p-1"
            src="/images/ic_close.svg"
            alt="plus"
          />
          <div className="w-20 h-5 text-center text-black text-sm font-normal  leading-tight">
            이미지 등록
          </div>
        </div>
        <div className="mt-2 text-zinc-400 text-sm font-normal  leading-tight">
          {images.length}/{count}
        </div>
      </div>
      {images.map((image, index) => (
        <div
          key={index}
          className="w-20 h-20   rounded-xl border border-stone-300"
        >
          <img
            src={image}
            alt="image"
            className="w-full h-20 object-cover rounded-xl"
          />
        </div>
      ))}
    </div>
  )
}
