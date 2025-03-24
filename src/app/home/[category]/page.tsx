'use client'

import BackAppbar from '@/components/common/BackAppbar'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AdvisorItem } from '../components/AdvisorItem'
import { useParams, useRouter } from 'next/navigation'
import { getTeachersByCategory, SearchType } from '@/app/api/teacher'
import { TeacherListDto } from '@/app/api/data'
import Modal from '@/components/common/Modal'
import Image from 'next/image'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { startInstantChat } from '@/app/api/chat'

export default function CategoryAdvisorList() {
  const [advisors, setAdvisors] = useState<TeacherListDto[]>([])
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)

  const param = useParams()
  const type = param.category?.toString().toUpperCase() ?? ''
  const router = useRouter()

  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  const [advisor, setAdvisor] = useState<TeacherListDto | null>(null)

  const onClickPhone = (advisor: TeacherListDto) => {
    setAdvisor(advisor)
    setIsPhoneModalOpen(true)
  }

  useEffect(() => {
    setAdvisors([])

    getTeachers(SearchType.RECENT, page)
  }, [])

  useEffect(() => {
    getTeachers(SearchType.RECENT, page)
  }, [page])

  const getTeachers = async (query: SearchType, page: number) => {
    const response = await getTeachersByCategory(query, page, type)
    if (response.content.length === 0) {
      setHasMore(false)

      return
    }
    if (advisors.length === 0) {
      setAdvisors(response.content)
      return
    }

    setHasMore(!response.last)
    setAdvisors((prev) => [...prev, ...response.content])
  }

  const lastAdvisorElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [hasMore]
  )

  return (
    <div>
      <BackAppbar />
      <div className="px-5 inline-flex gap-2.5 w-full flex-col">
        {advisors.map((item, index) => (
          <AdvisorItem
            key={type + index}
            {...item}
            onClickPhone={onClickPhone}
            ref={lastAdvisorElementRef}
          />
        ))}
      </div>
            <Modal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        title="실시간 전화 상담 안내"
        content=""
      >
        <div>
          {/* 상담사 기본 정보 */}
          <div className="flex items-center gap-4 mb-3">
            {advisor?.thumbnail ? (
              <Image
                src={advisor?.thumbnail ?? '/logo.jpg'}
                width={160}
                height={90}
                alt="profile"
              />
            ) : (
              <Image src="/logo.jpg" width={160} height={90} alt="profile" />
            )}

            <div className="ml-2 w-full justify-between text-zinc-900 text-xl font-bold">
              {advisor?.name} {advisor?.pinNumber}번
            </div>
          </div>
{/* ✅ 회색 작은 글씨 (위쪽 간격 mt-2, 아래쪽 간격 mb-3) */}
<p className="text-gray-400 text-sm mt-2 mb-3">
  전화 연결 후 989번을 입력하시면 상담사와 연결됩니다.
</p>


        {/* (1) 전화 상담(선불) 섹션 */}
        <div className="mt-6 mb-4">
          {/* 첫 번째 줄: 상담 타입 */}
          <div className="flex items-center gap-2">
            <Image
              src={'/images/cash_070.png'}
              width={24}
              height={24}
              alt="cash"
            />
            <p className="font-bold text-lg">전화 상담(선불)</p>
          </div>
          {/* 두 번째 줄: 가격 정보 */}
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
            <p className="font-bold text-lg">전화 상담(후불)</p>
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
            <p className="font-bold text-lg">채팅 상담(잔액차감)</p>
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
}
