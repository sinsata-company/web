'use client'

import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {TeacherListDto} from '@/app/api/data'
import {forwardRef, useEffect, useState} from 'react'
import TeacherTypeLabel from '@/components/common/TeacherTypeLabel'
import Modal from '@/components/common/Modal'
import { Button } from '@/components/common/Button'
import { BUTTON_TYPE } from '@/components/common/Button'
import { startInstantChat } from '@/app/api/chat'   
import { safeMap } from '@/utils/safeMap'

export default function AdvisorList({
    advisorList,
    changeLiked,
    lastAdvisorElementRef,
}: {
advisorList: TeacherListDto[]
changeLiked: (id: string) => void;
lastAdvisorElementRef?: (node: HTMLDivElement | null) => void
}) {
const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
const [advisor, setAdvisor] = useState<TeacherListDto | null>(null)

const onClickPhone = (advisor: TeacherListDto) => {
  console.log(advisor)
setAdvisor(advisor)
setIsPhoneModalOpen(true)
}

const clickLiked = (id: string) => {

};

const router = useRouter()

return (
<div className="inline-flex flex-col gap-2.5 w-full text-sm">
{safeMap(advisorList, (item, idx) => {
if (idx === advisorList.length - 1) {
return (
<AdvisorItem
{...item}
key={item.id}
ref={lastAdvisorElementRef}
onClickPhone={onClickPhone}
changeLiked={changeLiked}
/>
)
} else {
return <AdvisorItem changeLiked={changeLiked} {...item} key={idx} onClickPhone={onClickPhone}/>
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
<Image src="/logo.jpg" width={160} height={90} alt="profile"/>
)}

<div className="ml-2 w-full justify-between text-zinc-900 text-xl font-bold">
{advisor?.name} {advisor?.pinNumber}번
</div>
</div>
{/* 회색 작은 글씨 (위쪽 간격 mt-2, 아래쪽 간격 mb-3) */}
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

interface AdvisorItemProps extends TeacherListDto {
onClickPhone: (advisor: TeacherListDto) => void
changeLiked: Function;
}

const AdvisorItem = forwardRef<HTMLDivElement, AdvisorItemProps>(
function AdvisorItem(advisor, ref) {
  const {onClickPhone, changeLiked} = advisor;
  
  const [menuObj, setMenuObj] = useState<any>(null);

  // menu 데이터 파싱 로직 개선
  useEffect(() => {
    // advisor.menu만 의존성으로 사용
    const menuData = advisor.menu;

    try {
      if (menuData && typeof menuData === 'object') {
        setMenuObj(menuData);
        return;
      }

      if (menuData && typeof menuData === 'string' && menuData.trim()) {
        const parsed = JSON.parse(menuData);
        setMenuObj(parsed);
      } else {
        setMenuObj({
          "30": 1400,
          "10": 28000
        });
      }
    } catch (error) {
      console.error('Menu parsing error:', error);
      setMenuObj({
        "30": 1400,
        "10": 28000
      });
    }
  }, [advisor.menu]); // advisor 전체 객체 대신 menu 속성만 의존성으로 설정

  const nav = useRouter()

  const handleItemClick = () => {
    nav.push('/teacher/' + advisor.id)
  }

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClickPhone(advisor)
  }

  const renderPriceInfo = (price: string, duration: string) => (
    <div className="flex items-center gap-1">
      <Image src={'/images/ic_cash.svg'} width={16} height={16} alt="cash"/>
      <div className="flex items-baseline gap-1">
        <p>{price}</p>
        <p className="text-neutral-400 font-semibold font-light text-xs">
          {duration}
        </p>
      </div>
    </div>
  )

  const renderMenu = () => {
    // menuObj가 유효한 배열인지 확인
    if (!menuObj || !Array.isArray(menuObj)) {
        return (
            <div>
                {renderPriceInfo(
                    `${Number(advisor?.chatLastPay || 0).toLocaleString()}원`,
                    '30초'
                )}
            </div>
        );
    }

    // menuObj가 배열이면서 entries가 있는 경우
    return menuObj.slice(0, 2).map((menu, index) => {
        // menu가 배열 형태인 경우 ([key, value])
        if (Array.isArray(menu)) {
            const [key, value] = menu;
            return (
                <div key={`menu-${index}`}>
                    {renderPriceInfo(
                        `${Number(value || 0).toLocaleString()}원`,
                        `${key}${index === 0 ? '초' : '분'}`
                    )}
                </div>
            );
        }
        
        // menu가 객체 형태인 경우
        if (menu && typeof menu === 'object') {
            return (
                <div key={`menu-${index}`}>
                    {renderPriceInfo(
                        `${Number(menu.price || 0).toLocaleString()}원`,
                        `${menu.duration || 30}${index === 0 ? '초' : '분'}`
                    )}
                </div>
            );
        }

        return null;
    });
  };

  return (
    <div
      key={advisor?.id || ''}
      ref={ref}
      className="w-full items-stretch flex py-4 pb-2 rounded-2xl justify-start items-start inline-flex"
    >
      <div className="flex-basis relative">
        <Image
          onClick={handleItemClick}
          style={{objectFit: 'cover', minWidth: '120px', minHeight: '96px'}}
          className="rounded-xl w-[120px] h-24 cursor-pointer"
          src={advisor?.thumbnailURI || '/logo.jpg'}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          width={120}
          height={96}
          alt="profile"
        />
        <TeacherTypeLabel teacherType={advisor?.teacherType}/>
      </div>

      <div className="pl-2 flex flex-col justify-between grow overflow-hidden">
        <div className="items-center flex justify-between w-full cursor-pointer" onClick={handleItemClick}>
          <div className="overflow-hidden">
            <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              <div className="font-bold leading-tight text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                {advisor?.name?.replace(' 선생님', '')}
              </div>
              <span className="leading-none text-indigo-500 text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                {advisor?.hashtag}
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
            {renderMenu()}
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
                {advisor?.score || 0}
              </span>
              <span className="text-neutral-400 text-lg font-semibold ">
                {' '}
                ({(advisor?.scoreLen || 0).toLocaleString()})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
)

export {AdvisorItem}
