'use client'

import Script from 'next/script'

function KakaoScript() {
  const onLoad = () => {
    window.Kakao.init('74ef3f945bb5ca2ca7eb71e76a56eda8')
  }

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      async
      onLoad={onLoad}
    />
  )
}

export default KakaoScript
