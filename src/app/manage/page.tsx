'use client'

import LandingLogo from '@/components/logins/LandingLogo'
import SocialLoginButton from '@/components/logins/SocialLoginButton'
import { useRouter } from 'next/navigation'

export default function ManagePage() {
  const nav = useRouter()
  return (
    <div className="h-screen w-full flex flex-col  bg-amber-50">
      <LandingLogo />
      <div className="w-full px-5 py-10 flex-col justify-center items-center gap-3 inline-flex">
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
