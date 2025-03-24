'use client'

import Script from 'next/script'

function KakaoScript() {
  const onLoad = () => {
    if (typeof window !== 'undefined') {
      window.Kakao.init('74ef3f945bb5ca2ca7eb71e76a56eda8')
    }
  }

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      async
      onLoad={onLoad}
      strategy="afterInteractive"
    />
  )
}

export default KakaoScript
