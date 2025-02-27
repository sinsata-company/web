'use client'

import BackAppbar from '@/components/common/BackAppbar'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AdvisorItem } from '../components/AdvisorList'
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
                // window.alert(advisor?.id)
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
