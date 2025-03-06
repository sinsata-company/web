'use client'

import { startInstantChat } from '@/app/api/chat'
import { TeacherDetailDto } from '@/app/api/data'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import { IAdvisor } from '@/dummy/dummyTeacher'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function TeacherSummary({
  advisor,
}: {
  advisor: TeacherDetailDto | null
}) {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  const router = useRouter()
return (
  <div className="inline-flex flex-col gap-2.5 w-full text-sm">
    {/* 헤더 영역: 상담사명과 전화하기 버튼 */}
    <div className="flex w-full justify-between gap-2">
      <div className="flex flex-col flex-grow gap-4">
        <div className="text-black text-xl font-bold">상담사명</div>
      </div>
      <div
        onClick={() => setIsPhoneModalOpen(true)}
        className="p-2 bg-indigo-400/10 rounded-full flex justify-center items-center gap-1 cursor-pointer"
      >
        <Image
          src={'/images/ic_phone.svg'}
          width={20}
          height={20}
          alt="전화하기"
        />
        <div className="text-indigo-400 text-base font-bold leading-tight">
          전화하기
        </div>
      </div>
    </div>

    {/* 상담사 정보 영역 */}
    <div className="w-full mt-2 text-xl flex justify-between items-center gap-2">
      <p className="text-zinc-900 font-bold">{advisor?.name}</p>
      <p className="text-zinc-900 font-bold">{advisor?.pinNumber}번</p>
    </div>

    {/* 모달: 전화 및 채팅 상담 안내 */}
    <Modal
      isOpen={isPhoneModalOpen}
      onClose={() => setIsPhoneModalOpen(false)}
      title="실시간 전화 상담 안내"
      content=""
    >
      <div>
        {/* 상담사 기본 정보 */}
        <div className="flex items-center gap-4 mb-3">
          {advisor?.images[0] ? (
            <Image
              src={advisor?.images[0] ?? '/logo.jpg'}
              width={160}
              height={160}
              alt="profile"
              className="object-cover"
            />
          ) : (
            <Image
              src="/logo.jpg"
              width={160}
              height={160}
              alt="profile"
              className="object-cover"
            />
          )}

          <div className="ml-2 w-full justify-between text-zinc-900 text-xl font-bold">
            {advisor?.name} {advisor?.pinNumber}번
          </div>
        </div>

        {/* 회색 안내 문구 */}
        <p className="text-gray-400 text-sm mt-2 mb-3">
          전화 연결 후 989번을 입력하시면 상담사와 연결됩니다.
        </p>

        {/* (1) 전화 상담(선불) 섹션 */}
        <div className="mt-6 mb-4">
          <div className="flex items-center gap-2">
            <Image
              src={'/images/cash_070.png'}
              width={24}
              height={24}
              alt="cash"
            />
            <p className="font-bold text-lg whitespace-nowrap">전화 상담(선불)</p>
          </div>
          <p className="text-neutral-400 text-sm font-semibold text-right">
            30초 당 1,400원
          </p>
          <div className="w-full flex justify-center mt-2">
            <Button
              onClick={() => {
                window.location.href = `tel:070-8016-9122`
                setIsPhoneModalOpen(false)
              }}
              buttonType={BUTTON_TYPE.primary}
              label={<span className="text-xl font-bold">070-8016-9122</span>}
            />
          </div>
        </div>

        {/* (2) 전화 상담(후불) 섹션 */}
        <div className="mt-5 mb-4">
          <div className="flex items-center gap-2">
            <Image
              src={'/images/cash_060.png'}
              width={24}
              height={24}
              alt="cash"
            />
            <p className="font-bold text-lg whitespace-nowrap">전화 상담(후불)</p>
          </div>
          <p className="text-neutral-400 text-sm font-semibold text-right">
            30초 당 1,400원
          </p>
          <div className="w-full flex justify-center mt-2">
            <Button
              onClick={() => {
                window.location.href = `tel:060-500-8744`
                setIsPhoneModalOpen(false)
              }}
              buttonType={BUTTON_TYPE.primary}
              label={<span className="text-xl font-bold">060-500-8744</span>}
            />
          </div>
        </div>

        {/* (3) 채팅 상담(잔액차감) 섹션 */}
        <div className="mt-5 mb-4">
          <div className="flex items-center gap-2">
            <Image
              src={'/images/cash_070.png'}
              width={24}
              height={24}
              alt="cash"
            />
            <p className="font-bold text-lg whitespace-nowrap">채팅 상담(잔액차감)</p>
          </div>
          <p className="text-neutral-400 text-sm font-semibold text-right">
            30초 당 1,400원
          </p>
          <div className="flex justify-center w-auto mt-2">
            <Button
              onClick={async () => {
                const result = await startInstantChat(advisor?.id ?? '')
                router.push(`/chats/private/${result.chatRoomId}`)
              }}
              buttonType={BUTTON_TYPE.primary}
              label={<span className="text-xl font-bold">채팅상담 시작하기</span>}
            />
          </div>
        </div>
      </div>
    </Modal>
  </div>
)
