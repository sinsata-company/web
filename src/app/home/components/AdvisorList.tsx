'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TeacherDetailDto, TeacherListDto } from '@/app/api/data'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { teacherTypeConverter } from '@/utils/teacherTypeConverter'
import Modal from '@/components/common/Modal'
import { Button, BUTTON_TYPE } from '@/components/common/Button'

export default function AdvisorList({
  advisorList,
  lastAdvisorElementRef,
}: {
  advisorList: TeacherListDto[]
  lastAdvisorElementRef?: (node: HTMLDivElement | null) => void
}) {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
  const [advisor, setAdvisor] = useState<TeacherListDto | null>(null)

  const onClickPhone = (advisor: TeacherListDto) => {
    setAdvisor(advisor)
    setIsPhoneModalOpen(true)
  }

  return (
    <div className="inline-flex flex-col gap-2.5 w-full">
      {advisorList.map((item, idx) => {
        if (idx === advisorList.length - 1) {
          return (
            <AdvisorItem
              {...item}
              key={idx}
              ref={lastAdvisorElementRef}
              onClickPhone={onClickPhone}
            />
          )
        } else {
          return <AdvisorItem {...item} key={idx} onClickPhone={onClickPhone} />
        }
      })}

      <div className="h-32"></div>
      <Modal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        title="실시간 전화 상담 안내"
        content=""
      >
        <div>
          <div className="flex items-center gap-4">
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

interface AdvisorItemProps extends TeacherListDto {
  onClickPhone: (advisor: TeacherListDto) => void
}

const AdvisorItem = forwardRef<HTMLDivElement, AdvisorItemProps>(
  function AdvisorItem(advisor, ref) {
    const { id, name, thumbnail, hashtag, status, teacherType, onClickPhone } =
      advisor
    const nav = useRouter()
    return (
      <div
        ref={ref}
        onClick={() => {
          nav.push('/teacher/' + id)
        }}
        className="w-full grow h-28 p-4 bg-neutral-50 rounded-2xl border border-zinc-100 justify-start items-center gap-3 inline-flex"
      >
        <Image
          style={{
            objectFit: 'cover',
          }}
          className="rounded-xl w-25 h-18"
          src={thumbnail || '/logo.jpg'}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==" // 추가
          width={100}
          height={75}
          alt="profile"
        />
        <div className="grow flex-col justify-center items-start gap-2 inline-flex overflow-hidden">
          <div className="h-2.5 flex gap-2 items-baseline leading-tight">
            <div className="text-primary leading-tight font-extrabold font-['Pretendard Variable'] leading-none">
              {name}
            </div>
            <p className="text-sm text-primary leading-tight">
              {' '}
              | {teacherTypeConverter(teacherType?.toLowerCase())}
            </p>
          </div>
          <div className="inline-flex gap-2">
            {hashtag &&
              hashtag.split('#').map((tag, idx) => {
                if (tag === '') return null
                return (
                  <p
                    className="leadig-none text-primary"
                    key={'hash-' + idx}
                    style={{
                      fontWeight: 300,
                    }}
                  >
                    #{tag.trim()}{' '}
                  </p>
                )
              })}
          </div>
          <div className="inline-flex justify-between text-black text-sm font-bold font-['Pretendard Variable'] w-full overflow-hidden whitespace-nowrap text-ellipsis truncate">
            <p>선불 1200원</p>
            <p>15분 25,000원</p>
          </div>
        </div>
        <Image
          onClick={(e) => {
            e.stopPropagation()
            onClickPhone(advisor)
          }}
          className="rounded-xl w-25 h-8"
          src={`/images/status_${
            status == 0 ? 'live' : status == 1 ? 'calling' : 'notlive'
          }.png`}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==" // 추가
          width={100}
          height={28}
          alt="profile"
        />
      </div>
    )
  }
)

export { AdvisorItem }
