'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TeacherListDto } from '@/app/api/data'
import { forwardRef, useState } from 'react'
import Modal from '@/components/common/Modal'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { startInstantChat } from '@/app/api/chat'
import TeacherTypeLabel from '@/components/common/TeacherTypeLabel'

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
  const router = useRouter()

  return (
    <div className="inline-flex flex-col gap-2.5 w-full">
      {advisorList.map((item, idx) => {
        if (idx === advisorList.length - 1) {
          return (
            <AdvisorItem
              {...item}
              key={item.id}
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

            <div className=" ml-2 w-full justify-between text-zinc-900 text-xl font-bold ">
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
            <p className="text-neutral-400 text-lg font-semibold ">
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
            <p className="text-neutral-400 text-lg font-semibold ">
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

interface AdvisorItemProps extends TeacherListDto {
  onClickPhone: (advisor: TeacherListDto) => void
}

const AdvisorItem = forwardRef<HTMLDivElement, AdvisorItemProps>(
  function AdvisorItem(advisor, ref) {
    const { id, name, thumbnail, hashtag, summary, onClickPhone, teacherType } =
      advisor
    const nav = useRouter()

    const handleItemClick = () => {
      nav.push('/teacher/' + id)
    }

    const handlePhoneClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      console.log(advisor)
      onClickPhone(advisor)
    }

    const renderPriceInfo = (price: string, duration: string) => (
      <div className="flex items-center gap-1">
        <Image src={'/images/ic_cash.svg'} width={16} height={16} alt="cash" />
        <div className="flex items-baseline gap-1">
          <p>{price}</p>
          <p className="text-neutral-400 font-semibold font-light text-xs">
            {duration}
          </p>
        </div>
      </div>
    )

    return (
      <div
        ref={ref}
        onClick={handleItemClick}
        className="w-full items-stretch flex py-4 pb-2 rounded-2xl  justify-start items-start inline-flex"
      >
        <div className="flex-basis relative">
          <Image
            style={{ objectFit: 'cover', minWidth: '120px', minHeight: '96px' }}
            className="rounded-xl w-[120px] h-24 cursor-pointer"
            src={thumbnail || '/logo.jpg'}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            width={120}
            height={96}
            alt="profile"
          />
          <TeacherTypeLabel teacherType={teacherType} />
        </div>

        <div className="pl-2 flex flex-col justify-between grow overflow-hidden">
          <div className=" items-center flex justify-between w-full">
            <div className="overflow-hidden">
              {/* 선생님 이름 & 해쉬태그 */}
              <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                <div
                  className="font-extrabold leading-tight text-lg
                  whitespace-nowrap overflow-hidden text-ellipsis max-w-full
                  "
                >
                  {name?.replace(' 선생님', '')}
                </div>
                <span
                  className="
                leading-none text-indigo-400 text-sm  font-bold
                whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
                >
                  {hashtag}
                  {/* {renderHashtags()} */}
                </span>
              </div>
            </div>
            <Image
              onClick={handlePhoneClick}
              src={'/images/status_ready.svg'}
              width={120}
              height={40}
              alt="call"
              className="w-24 h-10"
            />
          </div>
          <div className="flex justify-between items-center w-full">
            {/* 요금표 */}
            <div className="flex-col inline-flex justify-between text-black text-sm font-bold">
              {renderPriceInfo('1,400원', '30초')}
              {renderPriceInfo('25,000원', '15분')}
            </div>
            <div className="flex">
              {/* 리뷰 평점 */}
              <div className="justify-start items-center gap-1 inline-flex">
                <div className="relative">
                  <Image
                    src={'/images/ic_star.svg'}
                    width={16}
                    height={16}
                    alt="chat"
                  />
                </div>
              </div>
              <div>
                <span className="text-neutral-800 text-lg font-bold ">
                  {advisor.rating}
                </span>
                <span className="text-neutral-400 text-lg font-semibold ">
                  {' '}
                  ({advisor.reviewCount})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export { AdvisorItem }
