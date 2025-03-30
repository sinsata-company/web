import Image from 'next/image'
import {useRouter, usePathname} from 'next/navigation'
import {TeacherListDto} from '@/app/api/data'
import {forwardRef, useEffect, useState} from 'react'
import {Button, BUTTON_TYPE} from '@/components/common/Button'
import TeacherTypeLabel from '@/components/common/TeacherTypeLabel'
import {basicPost} from "@/api/base";


interface AdvisorItemProps extends TeacherListDto {
    onClickPhone: (advisor: TeacherListDto) => void
    changeLiked: (id: number) => void;
    prepayInfo: {
        chatPrepay: number;
        callPrePay: number;
    }
}

type Menu = {
  id: number;
  type: 'call' | 'chat' | 'phone';
  minute: number;
  price: number;
  method?: string;
  unit: 'minute' | 'second';
}

export const createMenu = (data: [string, string][]): Menu[] => {
    const [first, ...rest] = data;
    const firstObj: Menu = {
        id: 0,
        type: 'call' as const,
        minute: Number(first[0]),
        method: 'cash',
        unit: 'minute' as const,
        price: Number(first[1]),
    };

    return [firstObj, ...rest.map(([minute, price], idx) => ({
        id: idx + 1,
        type: 'call' as const,
        minute: Number(minute),
        method: 'cash',
        unit: 'minute' as const,
        price: Number(price),
    }))];
};

export const AdvisorItem = forwardRef<HTMLDivElement, AdvisorItemProps>(
    function AdvisorItem({ prepayInfo, ...advisor }, ref) {
        const router = useRouter()
        const pathname = usePathname()
        const [menuObj, setMenuObj] = useState<Menu[]>([]);
        const [newSelfLiked, setSelfLiked] = useState<boolean>(advisor?.selfLiked);
        
        const isAbse = advisor?.status === 'ABSE';
        const isConsulting = advisor?.status === 'CONN';
        const isAvailable = advisor?.status === 'IDLE';

        console.log('advisor', advisor);
        //console.log('menuObj', menuObj);
        //console.log('prepayInfo', prepayInfo);

        const tags = (() => {
            if (!advisor?.hashtag) return [] as string[];
            return advisor?.hashtag.split(',').map((tag: string) => tag.trim());
        })();

        const changeSelfLiked = async () => {
            try {
                await basicPost("/users/changeLiked", { id: advisor?.id });
            } catch (error) {
                console.log('error', error);
                alert("찜 설정 도중 문제가 발생 했습니다. 잠시후 다시 시도 해주세요.")
            } finally {
                setSelfLiked(!newSelfLiked);
            }
        };

        useEffect(() => {
            window.history.scrollRestoration = 'manual';
            
            // 페이지 이동 후 저장되어 있던 위치로 스크롤 복원
            const _scroll = sessionStorage.getItem(`__next_scroll_${window.history.state.idx}`);
            if (_scroll) {
                const { x, y } = JSON.parse(_scroll);
                window.scrollTo(x, y);
                sessionStorage.removeItem(`__next_scroll_${window.history.state.idx}`);
            }
        }, [pathname]);

        useEffect(() => {
            if (!!advisor?.menu && advisor?.menu !== '' && advisor?.menu.trim().length > 0) {
                const data = JSON.parse(advisor?.menu);
                if (data.every((i: [string, string]) => Array.isArray(i) && i.length === 2)) {
                    setMenuObj(createMenu(data));
                } else {
                    setMenuObj(JSON.parse(advisor?.menu));
                }
            } else {
                setMenuObj([]);
            }

            console.log('menuObj', menuObj);
        }, [advisor?.menu]);

        const handleClick = () => {
            const currentScroll = window.scrollY;
            history.replaceState(
                { ...history.state, scrollPos: currentScroll },
                ''
            );
            router.push('/teacher/' + advisor?.id, {scroll: false});
        };

        const handlePhoneClick = (e: React.MouseEvent) => {
            e.stopPropagation()
            advisor?.onClickPhone(advisor)
        }

        const renderPriceInfo = (price: string, duration: string) => (
            <div className="relative flex items-center h-3">
                <div className="flex items-center" style={{width: '78px'}}>
                    <Image
                        src="/images/ic_cash.svg"
                        width={12}
                        height={12}
                        alt="cash"
                        className="absolute left-0"
                    />
                    <span className="absolute left-[16px] text-[12px] font-bold">{price}</span>
                </div>
                <span className="absolute left-[82px] text-neutral-400 text-[12px] font-semibold">
                    {duration}
                </span>
            </div>
        )

      if (!advisor) return null;

        return (
            <div 
                key={advisor.id}
                ref={ref}
                className="w-full flex flex-col bg-white overflow-hidden"
            >
                {/* 상단 영역 - 프로필 이미지와 정보 */}
                <div className="flex-1">
                    <div className="flex h-full gap-5">
                        {/* 왼쪽 이미지 */}
                        <div className="relative w-[173.33px] h-[128.88px] flex-shrink-0">
                            <Image
                                onClick={handleClick}
                                style={{objectFit: 'cover'}}
                                className="rounded-xl w-min-[173.33px] h-full cursor-pointer"
                                src={advisor?.thumbnail || '/logo.jpg'}
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                                alt="profile"
                                fill
                            />
                            <TeacherTypeLabel teacherType={advisor?.teacherType}/>
                        </div>

                        {/* 오른쪽 정보 */}
                        <div className="flex flex-col flex-1 h-[128.88px]">
                            {/* 이름과 번호 */}
                            <div className="font-extrabold flex items-center gap-2 mb-2 pt-1.5">
                                <span className="text-[18px] font-bold">{advisor?.name?.replace(' 선생님', '')}</span>     
                                <span className="text-neutral-300 font-extrabold text-base">|</span>
                                <span className="text-indigo-500 text-sm">{advisor?.pinNumber}번</span>
                            </div>

                            {/* 가격 정보 */}
                            <div className="flex-col flex justify-between h-full text-black">
                                <div className="flex flex-col gap-y-1.5">
                                    <div key={`menu-${advisor?.id}`} className="">
                                        {renderPriceInfo(
                                            `${Number(advisor?.chatLastPay || 0).toLocaleString()}원`,
                                            '30초'
                                        )}
                                    </div>
                                    
                                    {(() => {
                                        const chatMenu = menuObj.filter(menu => menu.type === 'chat')[0];
                                        const defaultMenu = menuObj[1]; // 기존 [1] 데이터

                                        const menuToUse = chatMenu || defaultMenu;

                                        if (typeof menuToUse === 'object' && menuToUse !== null) {
                                            return (
                                                <div key={`menu-${menuToUse.id}`} className="">
                                                    {renderPriceInfo(
                                                        `${Number(menuToUse.price || 0).toLocaleString()}원`,
                                                        `${menuToUse.minute}분`
                                                    )}
                                                </div>
                                            );
                                        }
                                        return null;
                                    })()}
                                </div>
                                
                                {isAbse && !isConsulting && (
                                    <Button
                                        buttonType={BUTTON_TYPE.abse}
                                        className="h-[32px] self-end !cursor-not-allowed"
                                        label={
                                            <div className="flex items-center justify-center gap-1">
                                                <Image
                                                    src="/images/minus.png"
                                                    width={15}
                                                    height={15}
                                                    alt="phone"
                                                    className="brightness-0 invert"
                                                />
                                                <span className="text-sm">부재중</span>
                                            </div>
                                        }
                                    />
                                )} 

                                {isConsulting && !isAbse && (
                                    <Button
                                        buttonType={BUTTON_TYPE.secondaryV2}
                                        className="h-[32px] self-end !cursor-not-allowed"
                                        label={
                                            <div className="flex items-center justify-center gap-1">
                                                <Image
                                                    src="/images/ic_phone.svg"
                                                    width={15}
                                                    height={15} 
                                                    alt="phone"
                                                    className="brightness-0 invert"
                                                />
                                                <span className="text-sm text-sinsata-blue">상담중</span>
                                            </div>
                                        }
                                    />
                                )} 

                                {/* 상담 버튼 */}
                                {isAvailable && !isAbse && !isConsulting && (
                                    <Button
                                        onClick={handlePhoneClick}
                                        buttonType={BUTTON_TYPE.secondaryV2}
                                        className="h-[32px] self-end"
                                        label={
                                            <div className="flex items-center justify-center gap-1">
                                                <Image
                                                    src="/images/ic_phone.svg"
                                                    width={15}
                                                    height={15}
                                                    alt="phone"
                                                    className="brightness-0 invert"
                                                />
                                                <span className="text-sm text-sinsata-blue">상담 가능</span>
                                            </div>
                                        }
                                    />
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                {/* 하단 영역 - 해시태그와 별점 */}
                <div className="flex items-center relative w-full h-[40px] gap-x-5">
                    <div className="flex w-[173.33px]">
                        {tags.map((tag: string) => (
                            <div key={tag} className="text-slate-400 text-sm font-bold leading-tight">
                                #{tag}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center shrink-0 flex-1">
                        <Image
                            src={'/images/ic_star.svg'}
                            width={13}
                            height={13}
                            alt="chat"
                        />
                        <span className="text-neutral-800 text-sm font-bold leading-tight">
                            {advisor?.score || 0}
                        </span>
                        <span className="text-neutral-400 text-sm font-semibold leading-tight">
                            ({(advisor?.scoreLen || 0).toLocaleString()})
                        </span>
                    </div>
                </div>
            </div>
        )
    }
)
