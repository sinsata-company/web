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
    <div className="w-full sh-20 flex flex-col justify-start items-start gap-2">
      <div className="flex w-full justify-between gap-2">
        <div className="flex-grow flex-shrink-0 flex flex-col justify-start items-start gap-4">
          <div className="w-full text-yellow-400 text-base font-bold font-['Pretendard Variable']">
            상담사명
          </div>
        </div>
        <div className="p-2 bg-red-600/10 rounded-full flex justify-center items-center gap-1">
          <Image
            src={'/images/ic_chat.svg'}
            width={20}
            height={20}
            alt="chat"
          />
          <div className="text-red-600 text-base font-bold font-['Pretendard Variable'] leading-tight">
            채팅하기
          </div>
        </div>
        <div
          onClick={() => setIsPhoneModalOpen(true)}
          className="p-2 bg-red-600/10 rounded-full flex justify-center items-center gap-1"
        >
          <Image
            src={'/images/ic_phone.svg'}
            width={20}
            height={20}
            alt="chat"
          />
          <div className="text-red-600 text-base font-bold font-['Pretendard Variable'] leading-tight">
            전화하기
          </div>
        </div>
      </div>
      <div className="w-full mt-2  text-xl  font-['Pretendard Variable'] flex justify-between items-center gap-2">
        <p className="text-zinc-900 font-bold">{advisor?.name}</p>
        <p className="text-zinc-900 fond-bold">{advisor?.pinNumber}번</p>
      </div>
      <Modal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        title="실시간 전화 상담 안내"
        content=""
      >
        <div>
          <div className="flex items-center gap-4">
            {advisor?.images.length ? (
              <Image
                src={advisor?.images[0] ?? '/logo.jpg'}
                width={160}
                height={90}
                alt="profile"
              />
            ) : (
              <Image src="/logo.jpg" width={160} height={90} alt="profile" />
            )}

            <div className="ml-2 w-full justify-between text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
              {advisor?.name} {advisor?.pinNumber}번
            </div>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <p className="font-bold text-lg">요금 안내</p>
            <p className=" text-lg text-zinc-900">30초 당 1,400원</p>
          </div>
          <div className="inline-flex flex-col w-full gap-2">
            <Button
              onClick={() => {
                window.location.href = `tel:060-500-8744`
                setIsPhoneModalOpen(false)
              }}
              buttonType={BUTTON_TYPE.primary}
              label={`070-8016-9122로 전화 후 ${advisor?.pinNumber}`}
            />
            <Button
              onClick={() => {
                setIsPhoneModalOpen(false)
              }}
              buttonType={BUTTON_TYPE.secondary}
              label={'취소'}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
