'use client'

import { useRouter } from 'next/navigation'
import HomeBanner, { IBannerProps } from './ImageCarousel'
import Modal from '@/components/common/Modal'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, BUTTON_TYPE } from '@/components/common/Button'

export default function AdCarousel() {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const banner: IBannerProps[] = [
    {
      image: '/images/banners/sst-banner-6.jpeg',
      onClick: () => {
        router.push('/my')
      },
    },
    // {
    //   image: '/images/banners/sst-banner-7.jpeg',
    //   onClick: () => {},
    // },
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
      onClick: () => {
        window.open('http://pf.kakao.com/_rMFxbn', '_blank')
      },
    },
    {
      image: '/images/banners/sst-banner-5.jpeg',
      onClick: () => {
        window.location.href = '/manage'
      },
    },
  ]

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenModal')

    if (!hasSeenModal) {
      setShowModal(true)
      localStorage.setItem('hasSeenModal', 'true')
    }
  }, [])

  return (
    <div className="px-5 w-full h-60 flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch h-60 bg-zinc-100 rounded-2xl">
        <HomeBanner banner={banner} showImageModal={() => {}} />
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="코인 이벤트"
        content=""
      >
        <Image
          onClick={() => {}}
          unoptimized
          className="w-full h-60 bg-gray-200 rounded-2xl mb-6"
          src="/images/banners/sst-banner-6.jpeg"
          width={54}
          height={240}
          alt="thumb"
        />
        <Button
          label="확인"
          buttonType={BUTTON_TYPE.primary}
          onClick={() => {
            setShowModal(false)
          }}
        />
      </Modal>
    </div>
  )
}
