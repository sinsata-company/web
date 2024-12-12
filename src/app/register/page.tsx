'use client'

import LandingLogo from '@/components/logins/LandingLogo'
import SocialLoginButton from '@/components/logins/SocialLoginButton'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const nav = useRouter()
  return (
    <div className="h-full w-full flex flex-col">
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
        <SocialLoginButton image="kakao" name="카카오" onClick={() => {}} />
        <SocialLoginButton image="naver" name="네이버" onClick={() => {}} />
      </div>
    </div>
  )
}
