'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TeacherListDto } from '@/app/api/data'
import { forwardRef, useState } from 'react'
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
    const { id, name, thumbnail, hashtag, summary, onClickPhone } = advisor
    const nav = useRouter()
    return (
      <div
        ref={ref}
        onClick={() => {
          nav.push('/teacher/' + id)
        }}
        className="w-full items-stretch flex-col p-4 pb-2 bg-neutral-50 rounded-2xl border border-zinc-100 justify-start items-start  inline-flex"
      >
        <div className="flex items-center grow">
          <Image
            style={{
              objectFit: 'cover',
            }}
            className="rounded-xl w-30 h-24 mr-1 cursor-pointer"
            src={thumbnail || '/logo.jpg'}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==" // 추가
            width={120}
            height={90}
            alt="profile"
          />

          <div className="border-b-2 border-primary-red flex  grow items-center">
            <div className="flex-col grow justify-center items-start gap-2 inline-flex overflow-hidden">
              <div className="flex-col flex items-baseline leading-tight">
                <div className=" font-extrabold leading-tight">{name}</div>
                <p className=" text-xs ">
                  {summary?.length > 20 ? summary.substring(0, 20) : summary}
                </p>
              </div>
              <div className="flex-col inline-flex justify-between text-black text-sm font-bold ">
                <div className="flex items-center  ">
                  <Image
                    src={'/images/cash_060.png'}
                    width={24}
                    height={24}
                    alt="cash"
                  />
                  <div className="flex items-baseline gap-1">
                    <p>1,400원</p>
                    <p className="font-light text-xs">30초</p>
                  </div>
                </div>
                <div className="flex items-center  ">
                  <Image
                    src={'/images/cash_070.png'}
                    width={24}
                    height={24}
                    alt="cash"
                  />
                  <div className="flex items-baseline gap-1">
                    <p>25,000원</p>
                    <p className="font-light text-xs">15분</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation()
                onClickPhone(advisor)
              }}
              className="cursor-pointer rounded-xl  bg-primary-red flex py-2 px-3 items-center"
              style={{
                height: 'auto',
                maxHeight: '2.5rem',
              }}
            >
              <Image
                src={'/images/button_call.png'}
                width={24}
                height={24}
                alt="call"
                className="mr-2 w-6 h-6"
              />
              <div className="text-white">전화 상담</div>
            </div>
          </div>
        </div>
        <div className="gap-2 text-sm text-primary-red flex justify-start mt-1">
          {hashtag &&
            hashtag.split('#').map((tag, idx) => {
              if (tag === '') return null
              return (
                <p
                  className="leadig-none text-primary-red text-bold font-bold"
                  key={'hash-' + idx}
                >
                  #{tag.trim()}{' '}
                </p>
              )
            })}
        </div>
      </div>
    )
  }
)

export { AdvisorItem }
