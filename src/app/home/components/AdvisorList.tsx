'use client'

import Image from 'next/image'
import {useRouter, usePathname} from 'next/navigation'
import {TeacherListDto} from '@/app/api/data'
import {forwardRef, useEffect, useState, useRef} from 'react'
import Modal from '@/components/common/Modal'
import {Button, BUTTON_TYPE} from '@/components/common/Button'
import {startInstantChat} from '@/app/api/chat'
import TeacherTypeLabel from '@/components/common/TeacherTypeLabel'
import {Heart} from "lucide-react";
import {basicPost} from "@/api/base";

export default function AdvisorList({
                                        advisorList,
                                        changeLiked,
                                        lastAdvisorElementRef,
                                    }: {
    advisorList: TeacherListDto[]
    changeLiked: Function;
    lastAdvisorElementRef?: (node: HTMLDivElement | null) => void
}) {
    const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
    const [advisor, setAdvisor] = useState<TeacherListDto | null>(null)
    const router = useRouter()
    const pathname = usePathname()
    const isNavigating = useRef(false);

    useEffect(() => {
        // 브라우저의 history state에서 스크롤 위치를 복원
        const restoreScroll = () => {
            if (history.state?.scrollPos) {
                window.scrollTo(0, history.state.scrollPos);
            }
        };

        // 페이지 로드/뒤로가기 시 스크롤 복원
        window.addEventListener('load', restoreScroll);
        window.addEventListener('popstate', restoreScroll);

        // 현재 스크롤 위치를 history state에 저장
        const saveScroll = () => {
            const currentScroll = window.scrollY;
            const currentState = history.state || {};
            history.replaceState(
                { ...currentState, scrollPos: currentScroll },
                ''
            );
        };

        // 스크롤 이벤트에 대한 디바운스 처리
        let timeoutId: NodeJS.Timeout;
        const handleScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(saveScroll, 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('load', restoreScroll);
            window.removeEventListener('popstate', restoreScroll);
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
            saveScroll(); // 언마운트 시 마지막 스크롤 위치 저장
        };
    }, []);

    const onClickPhone = (advisor: TeacherListDto) => {
        setAdvisor(advisor)
        setIsPhoneModalOpen(true)
    }

    const clickLiked = (id: string) => {

    };

    const handleItemClick = (id: string) => {
        const currentScroll = window.scrollY;
        // 현재 스크롤 위치를 sessionStorage와 history state에 모두 저장
        sessionStorage.setItem(
            `__next_scroll_${window.history.state.idx}`,
            JSON.stringify({
                x: window.pageXOffset,
                y: window.pageYOffset,
            })
        );
        
        history.replaceState(
            { ...history.state, scrollPos: currentScroll },
            ''
        );
        router.push(`/teacher/${id}`, {scroll: false});
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            isNavigating.current = false;
        }, 100);

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <div className="inline-flex flex-col gap-2.5 items-center w-full text-sm">
            {advisorList.map((item, idx) => {
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
                title={<span className="text-base">실시간 전화 상담 안내</span>}
                content=""
            >
                <div className="p-4">
                    {/* 상담사 기본 정보 */}
                    <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                        <Image
                            src={advisor?.thumbnail || '/logo.jpg'}
                            width={100}
                            height={100}
                            alt="profile"
                            className="rounded-lg object-cover"
                        />
                        <div className="text-zinc-900 text-sm flex items-center">
                            {advisor?.pinNumber}
                        </div>
                    </div>
                    
                    <p className="text-gray-400 text-[11px] mt-2 mb-3">
                        전화 연결 후 989번을 입력하시면 상담사와 연결됩니다.
                    </p>

                    {/* 상담 옵션들 */}
                    <div className="space-y-3">
                        {/* (1) 전화 상담(선불) 섹션 */}
                        <div className="p-3 border border-gray-100 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={'/images/cash_070.png'}
                                        width={20}
                                        height={20}
                                        alt="cash"
                                    />
                                    <p className="text-sm">전화 상담(선불)</p>
                                </div>
                                <p className="text-neutral-500 text-xs">
                                    30초 당 1,400원
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    onClick={() => {
                                        window.location.href = `tel:070-8016-9122`
                                        setIsPhoneModalOpen(false)
                                    }}
                                    buttonType={BUTTON_TYPE.primary}
                                    label={<span className="text-sm">070-8016-9122</span>}
                                    className="w-36 h-7"
                                />
                            </div>
                        </div>

                        {/* (2) 전화 상담(후불) 섹션 */}
                        <div className="p-3 border border-gray-100 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={'/images/cash_060.png'}
                                        width={20}
                                        height={20}
                                        alt="cash"
                                    />
                                    <p className="text-sm">전화 상담(후불)</p>
                                </div>
                                <p className="text-neutral-500 text-xs">
                                    30초 당 1,400원
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    onClick={() => {
                                        window.location.href = `tel:060-500-8744`
                                        setIsPhoneModalOpen(false)
                                    }}
                                    buttonType={BUTTON_TYPE.primary}
                                    label={<span className="text-sm">060-500-8744</span>}
                                    className="w-36 h-7"
                                />
                            </div>
                        </div>

                        {/* (3) 채팅 상담 섹션 */}
                        <div className="p-3 border border-gray-100 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={'/images/cash_070.png'}
                                        width={20}
                                        height={20}
                                        alt="cash"
                                    />
                                    <p className="text-sm">채팅 상담(잔액차감)</p>
                                </div>
                                <p className="text-neutral-500 text-xs">
                                    30초 당 1,400원
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    onClick={async () => {
                                        const result = await startInstantChat(advisor?.id ?? '')
                                        router.push(`/chats/private/${result.chatRoomId}`)
                                    }}
                                    buttonType={BUTTON_TYPE.primary}
                                    label={<span className="text-sm">채팅상담 시작하기</span>}
                                    className="w-36 h-7"
                                />
                            </div>
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
        const {id, name, thumbnail, hashtag, summary, selfLiked, onClickPhone, teacherType, menu, changeLiked} = advisor;
        const router = useRouter()
        const pathname = usePathname()
        const [menuObj, setMenuObj] = useState<any>(null);
        const [newSelfLiked, setSelfLiked] = useState<boolean>(selfLiked);

        const changeSelfLiked = async () => {
            try {
                await basicPost("/users/changeLiked", { id });
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
            if (!!menu && menu !== '' && menu.trim().length > 0) {
                setMenuObj(JSON.parse(menu));
            } else {
                setMenuObj(null);
            }
        }, []);

        const handleClick = () => {
            const currentScroll = window.scrollY;
            history.replaceState(
                { ...history.state, scrollPos: currentScroll },
                ''
            );
            router.push('/teacher/' + id, {scroll: false});
        };

        const handlePhoneClick = (e: React.MouseEvent) => {
            e.stopPropagation()
            onClickPhone(advisor)
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

        return (
            <div 
                key={advisor?.id || ''}
                ref={ref}
                className="w-[430px] h-[200px] flex flex-col bg-white overflow-hidden"
            >
                {/* 상단 영역 - 프로필 이미지와 정보 */}
                <div className="flex-1 p-4">
                    <div className="flex h-full gap-5">
                        {/* 왼쪽 이미지 */}
                        <div className="relative w-[120px] sm:w-[140px] h-full">
                            <Image
                                onClick={handleClick}
                                style={{objectFit: 'cover'}}
                                className="rounded-xl w-full h-full cursor-pointer"
                                src={thumbnail || '/logo.jpg'}
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                                alt="profile"
                                fill
                            />
                            <TeacherTypeLabel teacherType={teacherType}/>
                        </div>

                        {/* 오른쪽 정보 */}
                        <div className="flex flex-col flex-1 h-full">
                            {/* 이름과 번호 */}
                            <div className="font-extrabold flex items-center gap-2 mb-2">
                                <span className="text-[17px] font-black">{advisor?.name?.replace(' 선생님', '')}</span>
                                <span className="text-neutral-300 font-extrabold text-base">|</span>
                                <span className="text-indigo-500 text-sm">{advisor?.pinNumber}번</span>
                            </div>

                            {/* 가격 정보 */}
                            <div className="flex-col inline-flex justify-start text-black space-y-1 mb-5 h-[48px]">
                                {!!menuObj && menuObj.slice(0, 2).map(([key, value]: [key: string, value: number], index:number) => (
                                    <div key={key} className="h-6">
                                        {renderPriceInfo(
                                            `${Number(value).toLocaleString()}원`,
                                            `${key}${index === 0 ? '초' : '분'}`
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* 상담 버튼 */}
                            <div className="mt-auto">
                                <Button
                                    onClick={handlePhoneClick}
                                    buttonType={BUTTON_TYPE.primary}
                                    label={
                                        <div className="flex items-center justify-center gap-1">
                                            <Image
                                                src="/images/ic_phone.svg"
                                                width={12}
                                                height={12}
                                                alt="phone"
                                                className="brightness-0 invert"
                                            />
                                            <span className="text-sm">상담</span>
                                        </div>
                                    }
                                    className="w-full h-8 mt-2"
                                />
                                {/* <Image
                                onClick={handlePhoneClick}
                                src={'/images/status_ready.svg'}
                                width={120}
                                height={40}
                                alt="call"
                                className="w-24 h-10"
                            /> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 하단 영역 - 해시태그와 별점 */}
                <div className="w-full h-[40px] flex items-center px-4 bg-gray-50">
                    <div className="text-indigo-500 text-xs font-semibold leading-tight flex-1">
                        {advisor?.hashtag}
                    </div>
                    
                    <div className="flex items-center gap-1 ml-4 shrink-0">
                        <Image
                            src={'/images/ic_star.svg'}
                            width={13}
                            height={13}
                            alt="chat"
                        />
                        <span className="text-neutral-800 text-xs font-bold leading-tight">
                            {advisor.score || 0}
                        </span>
                        <span className="text-neutral-400 text-xs font-semibold leading-tight">
                            ({(advisor?.scoreLen || 0).toLocaleString()})
                        </span>
                    </div>
                </div>
            </div>
        )
    }
)

export {AdvisorItem}
