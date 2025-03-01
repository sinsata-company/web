'use client'

import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'

import './ImageCarousel.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export interface IBannerProps {
  image: string
  onClick: Function
}

export default function HomeBanner({
  showImageModal,
  banner,
}: {
  banner: IBannerProps[]
  showImageModal: Function
}) {
  var settings = {
    dots: true,
    infinite: true,
    waitForAnimate: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    customPaging: (i: number) => {
      return (
        <span className="customPaging">
          <div className="px-3 py-.5 bg-white/20 rounded-3xl justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-sm font-semibold ">{i + 1}/7</div>
          </div>
        </span>
      )
    },
  }
  return (
    <Slider {...settings}>
      {banner?.map((item, idx) => (
        <div
          key={idx}
          className="cursor-pointer"
          style={{ width: 54, height: 240, filter: 'grayscale(100%)' }}
        >
          <Image
            onClick={() => {
              item.onClick()
              showImageModal(item, idx)
            }}
            unoptimized
            className="w-full h-60 bg-gray-200 "
            src={item.image}
            width={54}
            height={240}
            alt="thumb"
          />
        </div>
      ))}
    </Slider>
  )
}
