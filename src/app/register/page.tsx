'use client'

import LandingLogo from '@/components/logins/LandingLogo'
import SocialLoginButton from '@/components/logins/SocialLoginButton'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RegisterPage() {
  useEffect(() => {
    window.Kakao.init('74ef3f945bb5ca2ca7eb71e76a56eda8') // 카카오 JavaScript 키로 초기화
    console.log(window.Kakao.isInitialized())
  }, [])

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/register/oauth/kakao',
    })
  }
  const nav = useRouter()
  return (
    <div className="h-full w-full flex flex-col  bg-zinc-900">
      <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      <LandingLogo />
      <div className="w-full px-5 py-10 shadow-inner flex-col justify-center items-center gap-3 inline-flex">
        <SocialLoginButton
          image="google"
          name="구글"
          onClick={() => {
            nav.push('/home')
          }}
        />
        <SocialLoginButton image="apple" name="애플" onClick={() => {}} />
        <SocialLoginButton
          image="kakao"
          name="카카오"
          onClick={loginWithKakao}
        />
        <SocialLoginButton image="naver" name="네이버" onClick={() => {}} />
      </div>
    </div>
  )
}
