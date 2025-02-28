'use client'

import { useRouter } from 'next/navigation'
import HomeBanner, { IBannerProps } from './ImageCarousel'
import Modal from '@/components/common/Modal'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Lottie from 'react-lottie'
import rulet1000 from '../../../../public/lottie/1000.json'
import rulet4000 from '../../../../public/lottie/4000.json'
import rulet7000 from '../../../../public/lottie/7000.json'
import rulet10000 from '../../../../public/lottie/10000.json'
import { getEvent } from '@/app/api/user'

export default function AdCarousel() {
  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState(0)
  const router = useRouter()
  const banner: IBannerProps[] = [
    {
      image: '/images/banners/sst-banner-0.png',
      onClick: () => {
        router.push('/my')
      },
    },
    {
      image: '/images/banners/sst-banner-1.jpeg',
      onClick: () => {},
    },
    {
      image: '/images/banners/sst-banner-2.jpeg',
      onClick: () => {},
    },
    {
      image: '/images/banners/sst-banner-3.jpeg',
      onClick: () => {},
    },
    {
      image: '/images/banners/sst-banner-4.jpeg',
      onClick: () => {},
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

  useEffect(() => {
    getEvent().then((res) => {
      console.log(res)
      setAmount(res)
      if (res > 0) {
        setShowModal(true)
      }
    })
  }, [])

  return (
    <div className="w-full h-60 flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch h-60 bg-zinc-100">
        <HomeBanner banner={banner} showImageModal={() => {}} />
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

const LottieAnimation: React.FC<
  LottieAnimationProps & { isOpen: boolean; onClose?: () => void }
> = ({ amount, onClose, isOpen }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
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

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full h-full"
    >
      <Lottie
        options={defaultOptions}
        height="80%"
        width="80%"
        style={{ maxWidth: '720px', aspectRatio: '720 / 1280' }}
      />
    </div>
  )
}
