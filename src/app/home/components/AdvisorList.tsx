'use client'

import { useState, useEffect, useRef } from 'react'
import { AdvisorItem } from './AdvisorItem'
import { TeacherListDto } from '@/app/api/data'
import { useRouter, usePathname } from 'next/navigation'
import Modal from '@/components/common/Modal'
import Image from 'next/image'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { startInstantChat } from '@/app/api/chat'

export default function AdvisorList({
    advisorList,
    lastAdvisorElementRef,
    changeLiked,
}: {
    advisorList: TeacherListDto[]
    lastAdvisorElementRef: (node: HTMLDivElement) => void
    changeLiked: (id: string) => void
}) {
    const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)
    const [advisor, setAdvisor] = useState<TeacherListDto | null>(null)
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter()
    const pathname = usePathname()
    const isNavigating = useRef(false);

    const safeAdvisorList = Array.isArray(advisorList) ? advisorList : [];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // 메인 페이지에서만 스크롤 위치 복원
        if (pathname === '/home') {
            const restoreScroll = () => {
                const scrollPos = history.state?.scrollPos;
                if (scrollPos && !isNavigating.current) {
                    window.scrollTo(0, scrollPos);
                }
            };
            restoreScroll();
        }
    }, [pathname])

    useEffect(() => {
        const timer = setTimeout(() => {
            isNavigating.current = false;
        }, 100);

        return () => clearTimeout(timer);
    }, [pathname]);

    if (!isMounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-400">로딩 중...</div>
            </div>
        );
    }

    const onClickPhone = (advisor: TeacherListDto) => {
        setAdvisor(advisor)
        setIsPhoneModalOpen(true)
    }

    return (
        <div className="inline-flex flex-col gap-2.5 items-center w-full text-sm">
            {isMounted && safeAdvisorList.length > 0 ? (
                safeAdvisorList.map((item, idx) => {
                    const id = item?.id || `fallback-id-${idx}`;
                    
                    return (
                        <AdvisorItem
                            {...item}
                            key={id}
                            ref={idx === (safeAdvisorList.length - 1) ? lastAdvisorElementRef : undefined}
                            onClickPhone={onClickPhone}
                            changeLiked={changeLiked}
                        />
                    );
                })
            ) : isMounted ? (
                <div className="p-4 text-center text-gray-500">선생님 목록이 없습니다.</div>
            ) : (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-pulse text-gray-400">로딩 중...</div>
                </div>
            )}
            {isPhoneModalOpen && advisor && (
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
                                {advisor?.pinNumber || ''}
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
                                            try {
                                                const advisorId = advisor?.id || '';
                                                if (!advisorId) {
                                                    console.error('Advisor ID is missing');
                                                    return;
                                                }
                                                const result = await startInstantChat(advisorId);
                                                if (result && result.chatRoomId) {
                                                    router.push(`/chats/private/${result.chatRoomId}`);
                                                } else {
                                                    console.error('Failed to start chat: Invalid response');
                                                }
                                            } catch (error) {
                                                console.error('Failed to start chat:', error);
                                            }
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
            )}
            <div className="h-32"></div>
        </div>
    )
}
