'use client'

import LandingLogo from '@/components/logins/LandingLogo'
import SocialLoginButton from '@/components/logins/SocialLoginButton'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ManagePage() {
  useEffect(() => {
    window.Kakao.init('74ef3f945bb5ca2ca7eb71e76a56eda8') // 카카오 JavaScript 키로 초기화
    console.log(window.Kakao.isInitialized())
  }, [])

  const nav = useRouter()
  return (
    <div className="h-full w-full flex flex-col  bg-zinc-900">
      <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      <LandingLogo />
      <div className="w-full px-5 py-10 shadow-inner flex-col justify-center items-center gap-3 inline-flex">
        <SocialLoginButton
          label="상담사 로그인하기"
          name=""
          onClick={() => {
            nav.push('/manage/auth/login')
          }}
        />
        <SocialLoginButton
          label="상담사 지원하기"
          name="상담사 지원하기"
          onClick={() => {
            nav.push('/manage/auth/register')
          }}
        />
      </div>
    </div>
  )
}
