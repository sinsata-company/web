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
    <div className="w-full sh-20 flex flex-col justify-start items-start gap-2">
      <div className="flex w-full justify-between gap-2">
        <div className="flex-grow flex-shrink-0 flex flex-col justify-start items-start gap-4">
          <div className="text-black text-xl font-bold font-['Pretendard']">
            상담사명
          </div>
        </div>
        {/* <div className="p-2 bg-red-600/10 rounded-full flex justify-center items-center gap-1">
          <Image
            src={'/images/ic_chat.svg'}
            width={20}
            height={20}
            alt="chat"
          />
          <div className="text-red-600 text-base font-bold font-['Pretendard Variable'] leading-tight">
            채팅하기
          </div>
        </div> */}
        <div
          onClick={() => setIsPhoneModalOpen(true)}
          className="p-2 bg-indigo-400/10 rounded-full flex justify-center items-center gap-1"
        >
          <Image
            src={'/images/ic_phone.svg'}
            width={20}
            height={20}
            alt="chat"
          />
          <div className="text-indigo-400 text-base font-bold font-['Pretendard Variable'] leading-tight">
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
          <div className="flex items-center gap-4 mb-3">
            {advisor?.images[0] ? (
              <Image
                src={advisor?.images[0] ?? '/logo.jpg'}
                width={160}
                height={90}
                alt="profile"
              />
            ) : (
              <Image src="/logo.jpg" width={160} height={90} alt="profile" />
            )}

            <div className=" ml-2 w-full justify-between text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
              {advisor?.name} {advisor?.pinNumber}번
            </div>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <div className="flex">
              <Image
                src={'/images/cash_060.png'}
                width={24}
                height={24}
                alt="cash"
              />
              <p className="font-bold text-lg">전화 상담(후불)</p>
            </div>
            <p className="text-neutral-400 text-lg font-semibold font-['Pretendard']">
              30초 당 1,400원
            </p>
          </div>
          <div className="text-zinc-600 py-3">
            하단 버튼을 눌러 전화 연결 후, 안내멘트에 따라 상담사 고유번호{' '}
            {advisor?.pinNumber}를 입력하시면 {advisor?.name} 선생님과
            연결됩니다.
          </div>
          <Button
            onClick={() => {
              window.location.href = `tel:060-500-8744`
              setIsPhoneModalOpen(false)
            }}
            buttonType={BUTTON_TYPE.primary}
            label={`060-500-8744로 전화 후 고유번호 입력`}
          />
          <div className="mt-5 mb-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src={'/images/cash_070.png'}
                width={24}
                height={24}
                alt="cash"
              />
              <p className="font-bold text-lg">채팅 상담(잔액차감)</p>
            </div>
            <p className="text-neutral-400 text-lg font-semibold font-['Pretendard']">
              30초 당 1,400원
            </p>
          </div>
          <div className="text-zinc-600 py-3">
            하단 버튼을 누르면, 회원권에 남아있는 잔액에서 상담료가 차감됩니다.
          </div>
          <div className="inline-flex flex-col w-full gap-2">
            <Button
              onClick={async () => {
                const result = await startInstantChat(advisor?.id ?? '')
                router.push(`/chats/private/${result.chatRoomId}`)

                // setIsPhoneModalOpen(false)
              }}
              buttonType={BUTTON_TYPE.primary}
              label={'채팅상담 시작하기'}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
