'use client'

import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Input from '@/components/common/Input'
import Image from 'next/image'
import { useState } from 'react'

const AdviseContent = () => {
  const [contents, setContents] = useState<string>('')

  return (
    <div className="self-stretch  flex-col justify-start items-start gap-5 flex">
      <div className="p-2 bg-red-600/10 rounded-full justify-center items-center gap-1 inline-flex">
        <Image src={'/images/ic_mic.svg'} width={16} height={16} alt="mic" />
        <div className="text-red-600 text-base font-bold font-['Pretendard Variable'] leading-tight">
          음성 녹음해서 보내기
        </div>
      </div>
      <Input
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        placeholder="새로운 상담 내용을 입력해주세요."
        textarea
        lines={8}
        useCounter
        maxLength={1000}
      />
      <Button buttonType={BUTTON_TYPE.primary} label="찾기" />
    </div>
  )
}

export default AdviseContent
