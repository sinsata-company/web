'use client'

import { applyTeacher } from '@/api/teacher'
import { uploadImageToS3 } from '@/app/api/s3'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import ImageInput from '@/components/common/ImageInput'
import Input from '@/components/common/Input'
import Selector from '@/components/common/Selector'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RegisterPage() {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [name, setName] = useState('')
  const [field, setField] = useState('')
  const [strengthField, setStrengthField] = useState('')
  const [hashTag, setHashTag] = useState('')
  const [hashTags, setHashTags] = useState<string[]>([])
  const [introduction, setIntroduction] = useState('')
  const [images, setImages] = useState<string[]>([])

  const router = useRouter()

  const validate = () => {
    if (password !== passwordConfirm) {
      setPasswordError('비밀번호가 일치하지 않습니다.')
      return false
    }
    setPasswordError('')
    return true
  }

  useEffect(() => {
    validate()
  }, [password, passwordConfirm])

  return (
    <div className="inline-flex flex-col gap-8 w-full">
      <Input
        name="비밀번호"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        placeholder="비밀번호를 입력해주세요"
        type="password"
      />
      <Input
        name="비밀번호 확인"
        value={passwordConfirm}
        onChange={(e) => {
          setPasswordConfirm(e.target.value)
        }}
        error={passwordError}
        placeholder="비밀번호를 다시 입력해주세요"
        type="password"
      />
      <Input
        name="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력해주세요"
      />
      <Input
        name="전화번호"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="전화번호를 입력해주세요"
      />
      <Selector
        placeholder="신점/사주/타로/심리 중 선택해주세요."
        name="상담 분야"
        value={field}
        onChange={(e) => setField(e)}
        lists={['신점', '사주', '타로', '심리']}
      />
      <Input
        name="상담사가 잘 하는 분야"
        value={strengthField}
        onChange={(e) => setStrengthField(e.target.value)}
        placeholder="잘 하는 분야에 대해 3문장으로 기재해주세요."
        textarea
        lines={3}
      />
      <Input
        name="해시 태그 입력"
        value={hashTag}
        onChange={(e) => setHashTag(e.target.value)}
        placeholder="입력 후 등록을 눌러주세요."
        useSuffix
        onClickSuffix={() => {
          setHashTags([...hashTags, hashTag])
          setHashTag('')
        }}
      />
      <div className="gap-2 inline-flex">
        {hashTags.map((tag) => (
          <div
            key={tag}
            className="h-9 px-3 py-2 bg-red-600/10 rounded-full justify-center items-center gap-1 inline-flex"
          >
            <div className="text-red-600 text-sm font-bold font-['Pretendard Variable'] leading-tight">
              #{tag}
            </div>
          </div>
        ))}
      </div>
      <Input
        name="상담사 소개"
        maxLength={1000}
        useCounter
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
        placeholder="자신에 대해 소개해주세요."
        textarea
        lines={5}
      />
      <ImageInput
        images={images}
        onUploadedImage={(image) => {
          setImages([...images, image])
        }}
        onDelete={(index) => {
          const newImages = [...images]
          newImages.splice(index, 1)
          setImages(newImages)
        }}
        count={20}
      />
      <Button
        buttonType={BUTTON_TYPE.primary}
        label="선생님 등록 신청하기"
        onClick={async () => {
          try {
            if (!validate()) {
              return
            }

            await applyTeacher({
              password,
              name,
              phoneNumber,
              imageList: images,
              hashtag: hashTags.join(','),
              introduction,
              teacherType: field,
              strongField: strengthField,
            })
            router.replace('/manage/auth/register/complete')
          } catch (e) {
            console.log(e)
          }
        }}
      />
    </div>
  )
}
