'use client'

import { BASE_URL, BASE_WEB } from '@/api/base'
import { auth, getAuthResult, signInWithGoogle } from '@/api/firebase'
import LandingLogo from '@/components/logins/LandingLogo'
import SocialLoginButton from '@/components/logins/SocialLoginButton'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { loginAndJoin } from '../api/user'
import { getRedirectResult } from 'firebase/auth'

export default function RegisterPage() {
  useEffect(() => {
    window.Kakao.init('74ef3f945bb5ca2ca7eb71e76a56eda8') // 카카오 JavaScript 키로 초기화
    const accessKey = localStorage.getItem('sst-access-key')
    const tokenExpireAt = localStorage.getItem('sst-access-token-expire-at')
    localStorage.removeItem('theme') // 테마 설정 삭제
    document.documentElement.classList.remove('dark') // dark 클래스 제거

    if (accessKey && tokenExpireAt) {
      const expireAt = new Date(parseInt(tokenExpireAt, 10))
      if (expireAt > new Date()) {
        nav.push('/home')
      }
    }
  }, [])

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: BASE_WEB + '/register/oauth/kakao',
    })
  }

  const firebaseGoogleLogin = async () => {
    // const result =
    const result = await signInWithGoogle(auth)
    if (result) {
      loginAndJoin(result, 'GOOGLE')
      nav.push('/home')
    }
  }

  const loginWithGoogle = () => {
    const clientId =
      '387467142815-acmspfmbq3mhjf55eqa3a03ervu2g0ig.apps.googleusercontent.com'

    const redirectUri = BASE_WEB + '/register/oauth/google'

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email+profile`

    const newWindow = window.open(
      googleAuthUrl,
      '_blank',
      'width=500,height=600'
    )
    // 부모 창에서 메시지 수신 대기
    window.addEventListener('message', (event) => {
      console.log('메세지 수신 : ' + event.data)
      console.log(event.data)

      const { accessToken, origin } = event.data

      if (origin == 'sst' && accessToken) {
        newWindow?.close()
        nav.push('/home')
        // window.location.reload() // 로그인 후 새로고침
        window.removeEventListener('message', () => {})
      }
    })

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
    <div className="h-screen w-full flex flex-col  bg-zinc-900">
      <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      <LandingLogo />
      <div className="w-full px-5 py-10 shadow-inner flex-col justify-center items-center gap-3 inline-flex">
        <SocialLoginButton
          image=""
          name="이메일"
          onClick={() => {
            nav.push('/register/oauth/email')
          }}
        />
        {/* <SocialLoginButton
          image="google"
          name="구글"
          onClick={loginWithGoogle}
        /> */}
        {/* <SocialLoginButton image="apple" name="애플" onClick={loginWithApple} /> */}
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
