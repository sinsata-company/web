'use client'

import { BASE_URL, BASE_WEB } from '@/api/base'
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
      redirectUri: BASE_WEB + '/register/oauth/kakao',
    })
  }
  const loginWithGoogle = () => {
    const clientId =
      '387467142815-acmspfmbq3mhjf55eqa3a03ervu2g0ig.apps.googleusercontent.com'

    const reidrectUri = BASE_WEB + '/register/oauth/google'
    console.log(BASE_WEB + '/register/oauth/google')
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${reidrectUri}&response_type=code&scope=email+profile`
    // window.location.href = googleAuthUrl
  }

  const loginWithNaver = () => {
    const clientId = 'jhsF1FFbQfwtnFulzCl4'
    const redirectUri = BASE_WEB + '/register/oauth/naver'
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=STATE_STRING`
    window.location.href = naverAuthUrl
  }

  const loginWithApple = () => {
    const clientId = 'com.sst.web'
    const redirectUri = BASE_WEB + '/register/oauth/apple'
    const appleAuthUrl = `https://appleid.apple.com/auth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=STATE_STRING`
    window.location.href = appleAuthUrl
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
          onClick={loginWithGoogle}
        />
        <SocialLoginButton image="apple" name="애플" onClick={loginWithApple} />
        <SocialLoginButton
          image="kakao"
          name="카카오"
          onClick={loginWithKakao}
        />

        <SocialLoginButton
          image="naver"
          name="네이버"
          onClick={loginWithNaver}
        />
      </div>
    </div>
  )
}
