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

const ConsultationSection = ({ 
  title, 
  price, 
  phoneNumber, 
  imageSrc, 
  onCall, 
  isChat = false 
}: {
  title: string;
  price: string;
  phoneNumber?: string;
  imageSrc: string;
  onCall: () => void;
  isChat?: boolean;
}) => (
  <div className="mt-5 mb-4">
    <div className="flex items-center gap-2">
      <Image src={imageSrc} width={24} height={24} alt="cash" />
      <p className="font-bold text-lg">{title}</p>
    </div>
    <p className="text-neutral-400 text-sm font-semibold text-right">
      {price}
    </p>
    <div className="w-full flex justify-center mt-2">
      <Button
        onClick={onCall}
        buttonType={BUTTON_TYPE.primary}
        label={
          <span className="text-xl font-bold">
            {isChat ? '채팅상담 시작하기' : phoneNumber}
          </span>
        }
      />
    </div>
  </div>
);

const ConsultationModal = ({ 
  advisor, 
  onClose, 
  router 
}: { 
  advisor: TeacherListDto | null;
  onClose: () => void;
  router: any;
}) => (
  <Modal
    isOpen={true}
    onClose={onClose}
    title="실시간 전화 상담 안내"
    content=""
  >
    <div>
      {/* 상담사 기본 정보 */}
      <div className="flex items-center gap-4 mb-3">
        <Image
          src={advisor?.thumbnail ?? '/logo.jpg'}
          width={160}
          height={90}
          alt="profile"
        />
        <div className="ml-2 w-full justify-between text-zinc-900 text-xl font-bold">
          {advisor?.name} {advisor?.pinNumber}번
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mt-2 mb-3">
        전화 연결 후 989번을 입력하시면 상담사와 연결됩니다.
      </p>

      <ConsultationSection
        title="전화 상담(선불)"
        price="30초 당 1,400원"
        phoneNumber="070-8016-9122"
        imageSrc="/images/cash_070.png"
        onCall={() => {
          window.location.href = 'tel:070-8016-9122';
          onClose();
        }}
      />

      <ConsultationSection
        title="전화 상담(후불)"
        price="30초 당 1,400원"
        phoneNumber="060-500-8744"
        imageSrc="/images/cash_060.png"
        onCall={() => {
          window.location.href = 'tel:060-500-8744';
          onClose();
        }}
      />

      <ConsultationSection
        title="채팅 상담(잔액차감)"
        price="30초 당 1,400원"
        imageSrc="/images/cash_070.png"
        isChat={true}
        onCall={async () => {
          const result = await startInstantChat(advisor?.id ?? '');
          router.push(`/chats/private/${result.chatRoomId}`);
        }}
      />
    </div>
  </Modal>
);

export default function AdvisorList({
  advisorList,
  changeLiked,
  lastAdvisorElementRef,
  chatLastPay
}: {
  advisorList: TeacherListDto[];
  changeLiked: (id: string) => void;
  lastAdvisorElementRef?: (node: HTMLDivElement | null) => void;
  chatLastPay: number;
}) {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<TeacherListDto | null>(null);
  const router = useRouter();

  const onClickPhone = (advisor: TeacherListDto) => {
    setSelectedAdvisor(advisor);
    setIsPhoneModalOpen(true);
  };


  return (
    <div className="inline-flex flex-col gap-2.5 w-full text-sm">
      
      {safeMap(advisorList, (advisor, idx) => (
        <AdvisorItem
          {...advisor}
          key={advisor.id}
          ref={idx === advisorList.length - 1 ? lastAdvisorElementRef : undefined}
          onClickPhone={onClickPhone}
          changeLiked={changeLiked}
          advisorList={advisorList}
        />
      ))}

      <div className="h-32" />
      
      {isPhoneModalOpen && (
        <ConsultationModal
          advisor={selectedAdvisor}
          onClose={() => setIsPhoneModalOpen(false)}
          router={router}
        />
      )}
    </div>
  );
}

interface AdvisorItemProps extends TeacherListDto {
  onClickPhone: (advisor: TeacherListDto) => void
  changeLiked: Function;
  advisorList: TeacherListDto[];
}

const AdvisorItem = forwardRef<HTMLDivElement, AdvisorItemProps>(
  function AdvisorItem({ onClickPhone, changeLiked, advisorList, ...advisor }, ref) {
    const [menuObj, setMenuObj] = useState<any>(null);

    // menuObj 설정을 위한 useEffect
    useEffect(() => {
      const menuData = advisor.menu;
      const matchingAdvisor = advisorList.find(item => item.mtnId === advisor.mtnId);
      
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

        // matchingAdvisor가 있다면 chatLastPay 업데이트
        if (matchingAdvisor) {
          advisor.chatLastPay = matchingAdvisor.chatLastPay;
        }
      } catch (error) {
        console.error('Menu parsing error:', error);
        setMenuObj({
          "30": 1400,
          "10": 28000
        });
      }
    }, [advisor.menu, advisor.mtnId, advisorList]);

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

    //console.log("advisor.  ss:", advisor);

    const renderMenu = (advisor: TeacherListDto) => {
      if (!menuObj || !Array.isArray(menuObj)) {
        return (
          <div>
            {renderPriceInfo(
              `${Number(advisor?.chatLastpay || 0).toLocaleString()}원`,
              '30초'
            )}
          </div>
        );
      }

      return menuObj.slice(0, 2).map((menu, index) => {
        if (index === 0) {
          return (
            <div key={`menu-${index}`}>
              {renderPriceInfo(
                `${Number(advisor.chatLastpay || 0).toLocaleString()}원`,
                '30초'
              )}
            </div>
          );
        }
        // 두 번째 항목 - menuObj의 형태에 따라 분기 처리
        if (Array.isArray(menuObj[1])) {
          // 배열 형태: ['duration', price]
          const [duration, price] = menuObj[1];
          return (
            <div key={`menu-${index}`}>
              {renderPriceInfo(
                `${Number(price || 0).toLocaleString()}원`,
                `${duration}분`
              )}
            </div>
          );
        } else if (menuObj[0] && typeof menuObj[0] === 'object' && menuObj[0].type === 'chat') {
          // 객체 형태: { type: 'chat', minute: number, price: number }
          return (
            <div key={`menu-${index}`}>
              {renderPriceInfo(
                `${Number(menuObj[0].price || 0).toLocaleString()}원`,
                `${menuObj[0].minute}분`
              )}
            </div>
          );
        } else if (Array.isArray(menuObj) && menuObj.length > 0) {
          // 객체 배열 형태에서 type이 'chat'이고 id가 가장 작은 항목 찾기
          const chatMenu = menuObj
            .filter(item => item.type === 'chat')
            .sort((a, b) => a.id - b.id)[0];
          
          if (chatMenu) {
            return (
              <div key={`menu-${index}`}>
                {renderPriceInfo(
                  `${Number(chatMenu.price || 0).toLocaleString()}원`,
                  `${chatMenu.minute}분`
                )}
              </div>
            );
          }
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
              {renderMenu(advisor)}
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
