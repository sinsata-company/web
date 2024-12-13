import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'

import './ImageCarousel.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function ImageCarousel({
  imageList,
  showImageModal,
}: {
  imageList: string[]
  showImageModal: Function
}) {
  var settings = {
    dots: true,
    infinite: false,
    // fade: true,

    waitForAnimate: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }
  return (
    <Slider {...settings}>
      {imageList.map((item, idx) => (
        <div key={idx} style={{ width: 54, height: 240 }}>
          <Image
            onClick={() => {
              showImageModal(item, idx)
            }}
            unoptimized
            className="w-full h-60 bg-gray-200 rounded-2xl"
            // src={item}
            src={'/images/sample-teacher.png'}
            width={54}
            height={240}
            alt="thumb"
            // fill
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
    </Slider>
  )
}
