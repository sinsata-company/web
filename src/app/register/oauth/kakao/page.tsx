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
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const error = urlParams.get('error')

        if (error || !code) {
          console.error('카카오 로그인 에러:', error)
          router.push('/')
          return
        }

        // 안드로이드에서는 직접 카카오 인증 URL로 리다이렉트
        if (/Android/i.test(navigator.userAgent)) {
          const KAKAO_AUTH_URL = 
            `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}` +
            `&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_WEB_BASE_URL + '/register/oauth/kakao')}` +
            `&response_type=code`;
          
          window.location.href = KAKAO_AUTH_URL;
          return;
        }

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
        router.push('/')
      }
    }

    fetchToken()
  }, [])

  return <div>로그인 처리 중...</div>
}
