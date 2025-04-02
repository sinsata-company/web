'use client'

import { BASE_URL } from '@/api/base'
import { basicPost } from '@/app/api/base'
import { login } from '@/app/api/user'
import axios from 'axios'
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
      // URL에서 code 파라미터 추출
      const code = new URL(window.location.href).searchParams.get('code')
      
      // 모바일 앱에서 접근한 경우 처리
      if (window.location.href.includes('intent://')) {
        const intentUrl = window.location.href
        // 안드로이드 앱으로 리다이렉트
        if (/Android/i.test(navigator.userAgent)) {
          window.location.href = intentUrl.replace('intent://', 'https://')
          return
        }
        // iOS 앱으로 리다이렉트
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = intentUrl.replace('intent://', 'kakaolink://')
          return
        }
      }

      try {
        const response = await basicPost('/users/key', {
          loginType: 'KAKAO',
          accessToken: code,
          deviceId: getMachineId(),
          deviceInfo: 'Chrome',
          deviceType: /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'Mobile' : 'Web',
        })

        if (response && response?.isRegistered) {
          await login(response)
          router.push('/home')
        } else {
          router.push(`/register/info?key=${JSON.stringify(response)}`)
        }
      } catch (error) {
        console.error('Error fetching token:', error)
      }
    }

    fetchToken()
  }, [])

  return <div>로그인 처리 중...</div>
}
