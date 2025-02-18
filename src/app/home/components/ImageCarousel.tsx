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
            className="w-full h-60 bg-gray-200 rounded-2xl"
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
