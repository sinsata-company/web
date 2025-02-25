'use client'

import { TeacherDetailDto, TeacherListDto } from '@/app/api/data'
import { requestRecommendation } from '@/app/api/teacher'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Input from '@/components/common/Input'
import Loading from '@/components/common/Loading'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const AdviseContent = () => {
  const [contents, setContents] = useState<string>('')
  const [contentsError, setContentsError] = useState<string>('')
  const [isLoaing, setIsLoading] = useState<boolean>(false)

  const getRecommendation = async () => {
    const result = await requestRecommendation(contents)
    return result
  }
  const router = useRouter()

  return (
    <div className="self-stretch  flex-col justify-start items-start gap-5 flex">
      {false && (
        <div className="p-2 bg-red-600/10 rounded-full justify-center items-center gap-1 inline-flex">
          <Image src={'/images/ic_mic.svg'} width={16} height={16} alt="mic" />
          <div className="text-red-600 text-base font-bold font-['Pretendard Variable'] leading-tight">
            음성 녹음해서 보내기
          </div>
        </div>
      )}
      <Input
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        placeholder="새로운 상담 내용을 입력해주세요."
        textarea
        lines={8}
        useCounter
        maxLength={1000}
        error={contentsError}
      />

      <Button
        buttonType={BUTTON_TYPE.primary}
        label="찾기"
        onClick={async () => {
          if (!contents) {
            setContentsError('내용을 입력해주세요.')
            return
          }
          if (contents.length < 20) {
            setContentsError('20자 이상 입력해주세요.')
            return
          }
          setContentsError('')
          setIsLoading(true)
          const result = await getRecommendation()
          setIsLoading(false)
          router.push(`/search/result?requestId=${result}`)
        }}
      />
      {isLoaing && <Loading />}
      {/* <Loading /> */}
    </div>
  )
}

export default AdviseContent
