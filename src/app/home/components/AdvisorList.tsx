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
    const scrollRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            scrollRef.current = window.scrollY
            sessionStorage.setItem(`scroll_${pathname}`, String(scrollRef.current))
        }

        const handleBeforeUnload = () => {
            sessionStorage.setItem(`scroll_${pathname}`, String(scrollRef.current))
        }

        // 스크롤 위치 복원
        const savedScroll = sessionStorage.getItem(`scroll_${pathname}`)
        if (savedScroll) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedScroll))
            }, 100)
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [pathname])

    const onClickPhone = (advisor: TeacherListDto) => {
        setAdvisor(advisor)
        setIsPhoneModalOpen(true)
    }

    const clickLiked = (id: string) => {

    };

    const handleItemClick = (id: string) => {
        sessionStorage.setItem(`scroll_${pathname}`, String(window.scrollY))
        router.push(`/teacher/${id}`)
    }

    return (
        <div className="inline-flex flex-col gap-2.5 w-full text-sm">
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
                        <div className="text-zinc-900 text-sm">
                            {advisor?.pinNumber}번
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
        const {id, name, thumbnail, hashtag, summary, selfLiked, onClickPhone, teacherType, menu, changeLiked} =
            advisor;

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
            if (!!menu && menu !== '' && menu.trim().length > 0) {
                setMenuObj(JSON.parse(menu));
            } else {
                setMenuObj(null);
            }
        }, []);

        const nav = useRouter()

        const handleItemClick = () => {
            nav.push('/teacher/' + id)
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

        return (
            <div
                key={advisor?.id || ''}
                ref={ref}
                className="w-full h-full flex p-3 rounded-2xl justify-start items-start"
            >
                <div className="relative w-[140px] sm:w-[173.33px] aspect-[173.33/128.88]">
                    <Image
                        onClick={handleItemClick}
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

                <div className="pl-4 flex flex-col justify-between grow overflow-hidden">
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

                    <div className="flex justify-between items-center w-full mt-2">
                        {/* 요금표 */}
                        <div className="flex-col inline-flex justify-between text-black text-sm font-bold">
                            {!!menuObj && menuObj.slice(0, 2).map(([key, value]: [key: string, value: number],  index:number) => (
                                <div key={key}>
                                    {renderPriceInfo(
                                        `${Number(value).toLocaleString()}원`,
                                        `${key}${index === 0 ? '초' : '분'}`
                                    )}
                                </div>
                            ))}
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
                  {advisor.score || 0}
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
