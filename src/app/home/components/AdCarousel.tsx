'use client'

import HomeBanner from './ImageCarousel'

export default function AdCarousel() {
  return (
    <div className="px-5 w-full h-60 flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch h-60 bg-zinc-100 rounded-2xl">
        <HomeBanner
          imageList={[
            '/images/banners/sst-banner-1.jpeg',
            '/images/banners/sst-banner-2.jpeg',
            '/images/banners/sst-banner-3.jpeg',
            '/images/banners/sst-banner-4.jpeg',
            '/images/banners/sst-banner-5.jpeg',
            '/images/banners/sst-banner-6.jpeg',
            '/images/banners/sst-banner-7.jpeg',
          ]}
          showImageModal={() => {}}
        />
      </div>
    </div>
  )
}
