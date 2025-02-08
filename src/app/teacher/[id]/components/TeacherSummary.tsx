'use client'

import { TeacherDetailDto } from '@/app/api/data'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import { IAdvisor } from '@/dummy/dummyTeacher'
import Image from 'next/image'
import { useState } from 'react'

export default function TeacherSummary({
  advisor,
}: {
  advisor: TeacherDetailDto | null
}) {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  return (
    <div className="w-full sh-20 flex justify-start items-start gap-2">
      <div className="flex-grow flex-shrink-0 flex flex-col justify-start items-start gap-4">
        <div className="w-full text-yellow-400 text-base font-bold font-['Pretendard Variable']">
          상담사명
        </div>
        <div className="w-full text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
          {advisor?.name}
        </div>
      </div>
      <div className="p-2 bg-red-600/10 rounded-full flex justify-center items-center gap-1">
        <Image src={'/images/ic_chat.svg'} width={20} height={20} alt="chat" />
        <div className="text-red-600 text-base font-bold font-['Pretendard Variable'] leading-tight">
          채팅하기
        </div>
      </div>
      <div
        onClick={() => setIsPhoneModalOpen(true)}
        className="p-2 bg-red-600/10 rounded-full flex justify-center items-center gap-1"
      >
        <Image src={'/images/ic_phone.svg'} width={20} height={20} alt="chat" />
        <div className="text-red-600 text-base font-bold font-['Pretendard Variable'] leading-tight">
          전화하기
        </div>
      </div>
      <Modal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        title="전화 상담 안내"
        content=""
      >
        <div>
          <div className="mb-4 flex items-center">
            <p className="text-gradient text-lg">070-8016-9122</p>로 전화를 거신
            후 &nbsp;
            <div className="flex items-center gap-2">
              <p className="text-gradient text-lg">000</p>을 입력해주세요.
            </div>
          </div>
          <Button
            onClick={() => {
              setIsPhoneModalOpen(false)
            }}
            buttonType={BUTTON_TYPE.primary}
            label="확인"
          />
        </div>
      </Modal>
    </div>
  )
}
