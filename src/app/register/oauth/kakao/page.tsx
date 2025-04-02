'use client'

import { BASE_URL } from '@/api/base'
import { basicPost } from '@/app/api/base'
import { login } from '@/app/api/user'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function KakaoRedirect() {
  const router = useRouter()

  function getMachineId() {
    let machineId = localStorage.getItem('MachineId')
    if (!machineId) {
      machineId = crypto.randomUUID()
      localStorage.setItem('MachineId', machineId)
    }
    return machineId
  }

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // 현재 URL에서 code 또는 error 파라미터 추출
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const error = urlParams.get('error')

        // 에러가 있거나 코드가 없으면 홈으로 리다이렉트
        if (error || !code) {
          console.error('카카오 로그인 에러:', error)
          router.push('/')
          return
        }

        // 모바일 디바이스 체크
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
          
        // 안드로이드에서 카카오 앱으로 돌아가기
        if (/Android/i.test(navigator.userAgent)) {
          const intentURI = `intent://oauth?code=${code}#Intent;scheme=kakao${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID};package=com.kakao.talk;end`
          window.location.href = intentURI
          return
        }

        // iOS에서 카카오 앱으로 돌아가기
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = `kakaolink://oauth?code=${code}`
          return
        }

        const response = await basicPost('/users/key', {
          loginType: 'KAKAO',
          accessToken: code,
          deviceId: getMachineId(),
          deviceInfo: 'Chrome',
          deviceType: isMobile ? 'Mobile' : 'Web',
        })

        if (response && response?.isRegistered) {
          await login(response)
          router.push('/home')
        } else {
          router.push(`/register/info?key=${JSON.stringify(response)}`)
        }
      } catch (error) {
        console.error('Error fetching token:', error)
        router.push('/')
      }
    }

    fetchToken()
  }, [])

  return <div>로그인 처리 중...</div>
}
