'use client'

import {useRouter} from 'next/navigation'
import HomeBanner, {IBannerProps} from './ImageCarousel'
import Modal from '@/components/common/Modal'
import {JSX, useEffect, useState} from 'react'
import Lottie from 'react-lottie'
import rulet1000 from '../../../../public/lottie/1000.json'
import rulet4000 from '../../../../public/lottie/4000.json'
import rulet7000 from '../../../../public/lottie/7000.json'
import rulet10000 from '../../../../public/lottie/10000.json'
import {basicUnpagedGet} from '../../../api/base'
import { UserDto } from '@/types/user'
import axios from 'axios'
import { config } from '@/config'

const { API_BASE_URL } = config

export default function AdCarousel() {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [amount, setAmount] = useState(0)

    const getAccessToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('sst-access-token')
        }
        return null
    }

    const checkEventParticipation = async () => {
        try {
            const accessToken = getAccessToken()
            if (!accessToken) {
                alert('로그인이 필요합니다.')
                router.push('/my')
                return null
            }

            const response = await axios.get(`${API_BASE_URL}/users/check-event`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            })

            // 사용자 정보와 참여 상태를 함께 반환
            return {
                userInfo: response.data,
                canParticipate: !response.data.isParticipatedEvent
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    alert('세션이 만료되었습니다. 다시 로그인해주세요.')
                    router.push('/login')
                } else {
                    console.error('Event participation check error:', error)
                    alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
                }
            }
            return null
        }
    }

    const updateEventParticipation = async (userInfo: any) => {
        try {
            const accessToken = getAccessToken()
            if (!accessToken) return false

            const response = await axios.put(`${API_BASE_URL}/users/update-event-status`, userInfo, {
                headers: {
                    'SST-ACCESS-TOKEN': `${accessToken}`,
                    'SST-TEACHER-TOKEN': `${accessToken}`,
                },
            })
            return true
        } catch (error) {
            console.error('Update event participation error:', error)
            return false
        }
    }

    const banners = [
        {
            image: '/images/banners/sst-banner-0.png',
            onClick: async () => {
                const result = await checkEventParticipation()
                if (result === null) {
                    return
                }
                
                const { userInfo, canParticipate } = result
                
                if (canParticipate) {
                    const updated = await updateEventParticipation(userInfo)
                    if (updated) {
                        setShowModal(true)
                        setAmount(1000)
                    }
                } else {
                    alert('이미 이벤트에 참여하셨습니다.')
                }
            },
        },
        {
            image: '/images/banners/sst-banner-1.jpeg',
            onClick: () => {
            },
        },
        {
            image: '/images/banners/sst-banner-2.jpeg',
            onClick: () => {
            },
        },
        {
            image: '/images/banners/sst-banner-3.jpeg',
            onClick: () => {
            },
        },
        {
            image: '/images/banners/sst-banner-4.jpeg',
            onClick: () => {
            },
        },
        {
            image: '/images/banners/sst-banner-5.png',
            onClick: () => {
                window.open('http://pf.kakao.com/_rMFxbn', '_blank')
            },
        },
        {
            image: '/images/banners/sst-banner-6.png',
            onClick: () => {
                window.location.href = '/manage'
            },
        },
    ]

    return (
        <div className="w-full h-60 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="self-stretch h-60 bg-zinc-100">
                <HomeBanner banner={banners} showImageModal={() => {
                }}/>
            </div>

            <LottieAnimation
                amount={amount}
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                }}
            />
        </div>
    )
}

interface LottieAnimationProps {
    amount: number
}

const LottieAnimation: ({amount, onClose, isOpen}: {
    amount: any;
    onClose: any;
    isOpen: any
}) => (null | JSX.Element) = ({amount, onClose, isOpen}) => {
    const [start, setStart] = useState<boolean>(false);
    const [isEnd, setEnd] = useState<boolean>(false);
    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData:
            amount == 1000
                ? rulet1000
                : amount == 4000
                    ? rulet4000
                    : amount == 7000
                        ? rulet7000
                        : rulet10000,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }

    console.log('amount', amount)

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full h-full"
            onClick={() => isEnd ? onClose() : setStart(true)}
        >
            <Lottie
                options={defaultOptions}
                height="80%"
                width="80%"
                isStopped={!start}
                style={{maxWidth: '720px', aspectRatio: '720 / 1280'}}
                eventListeners={[
                    {
                        eventName: 'complete',
                        callback: () => {
                            console.log('the animation completed:');
                            setEnd(true);
                        },
                    },
                ]}
            />
        </div>
    )
}
