'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { startInstantChat } from '@/app/api/chat'
import { TeacherDetailDto, ReserveDto } from '@/app/api/data'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import { myReserves } from '@/app/api/reserve'

interface TeacherSummaryProps {
  advisor: TeacherDetailDto | null
}

export default function TeacherSummary({ advisor }: TeacherSummaryProps) {
  const [reservation, setReservation] = useState<ReserveDto | null>(null)
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  const router = useRouter()

  // 예약 정보 API 호출
  useEffect(() => {
    async function fetchReservation() {
      try {
        const res = await myReserves()
        const firstRes = Array.isArray(res) ? res[0] : res
        setReservation(firstRes)
      } catch (error) {
        console.error('예약 정보를 불러오는데 실패했습니다:', error)
      }
    }
    fetchReservation()
  }, [])

  return (
    <div className="w-full flex flex-col gap-2">
      {/* 상단 헤더 */}
      <div className="flex w-full justify-between gap-2">
        <div className="flex flex-col flex-grow gap-4">
          <div className="text-black text-xl font-bold font-['Pretendard']">
            상담사명
          </div>
        </div>
        <div
          onClick={() => setIsPhoneModalOpen(true)}
          className="cursor-pointer p-2 bg-indigo-400/10 rounded-full flex items-center gap-1"
        >
          <Image
            src={'/images/ic_phone.svg'}
            width={20}
            height={20}
            alt="전화하기"
          />
          <div className="text-indigo-400 text-base font-bold font-['Pretendard Variable']">
            전화하기
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between items-center mt-2 text-xl font-bold font-['Pretendard Variable']">
        <p className="text-zinc-900">{advisor?.name}</p>
        <p className="text-zinc-900">{advisor?.pinNumber}번</p>
      </div>

      {/* 모달: 선불, 후불, 채팅 상담 섹션 */}
      <Modal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        title="실시간 전화 상담 안내"
        content=""
      >
        <div className="max-w-md mx-auto space-y-8 px-0 py-4">
          {/* 프로필 영역 */}
          <div className="flex items-center gap-4 mb-3">
            {advisor?.images[0] ? (
              <Image
                src={advisor?.images[0] ?? '/logo.jpg'}
                width={160}
                height={90}
                alt="profile"
                className="rounded-xl"
              />
            ) : (
              <Image
                src="/logo.jpg"
                width={160}
                height={90}
                alt="profile"
                className="rounded-xl"
              />
            )}
            <div className="ml-2 w-full text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
              {advisor?.name} {advisor?.pinNumber}번
            </div>
          </div>

          {/* 회색 작은 안내 문구 */}
          <p className="text-gray-400 text-sm mt-2 mb-3">
            전화 연결 후 989번을 입력하시면 상담사와 연결됩니다.
          </p>

          {/* 선불 전화 상담 섹션 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Image
                src={'/images/cash_060.png'}
                width={24}
                height={24}
                alt="cash"
              />
              <p className="font-bold text-lg">전화 상담(선불)</p>
            </div>
            <div className="w-full flex justify-center">
              <Button
                onClick={() => {
                  window.location.href = `tel:070-8016-9122`
                  setIsPhoneModalOpen(false)
                }}
                buttonType={BUTTON_TYPE.primary}
                label={
                  <span className="text-xl font-bold">
                    (070-8016-9122)
                  </span>
                }
              />
            </div>
          </div>

          {/* 후불 전화 상담 섹션 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
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
            <Button
              onClick={() => {
                window.location.href = `tel:060-500-8744`
                setIsPhoneModalOpen(false)
              }}
              buttonType={BUTTON_TYPE.primary}
              label={
                <span className="text-xl font-bold">
                  (060-500-8744)
                </span>
              }
            />
          </div>

          {/* 채팅 상담 섹션 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
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
            <div className="flex justify-center w-auto gap-2">
              <Button
                onClick={async () => {
                  const result = await startInstantChat(advisor?.id ?? '')
                  router.push(`/chats/private/${result.chatRoomId}`)
                }}
                buttonType={BUTTON_TYPE.primary}
                label={
                  <span className="text-xl font-bold">
                    채팅상담 시작하기
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}