'use client'

import { BASE_URL } from '@/api/base'
import { basicPost } from '@/app/api/base'
import { login } from '@/app/api/user'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import KakaoScript from '@/components/common/KakaoScript'

declare global {
  interface Window {
    Kakao: any;
  }
}

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

  const loginWithKakao = () => {
    if (window.Kakao) {
      window.Kakao.Auth.authorize({
        redirectUri: `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/register/oauth/kakao`,
        state: 'userState',
      })
    }
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

        // 카카오 토큰 받기
        if (window.Kakao) {
          const token = await window.Kakao.Auth.getAccessToken()
          if (!token) {
            await window.Kakao.Auth.setAccessToken(code)
          }
        }

        const response = await basicPost('/users/key', {
          loginType: 'KAKAO',
          accessToken: code,
          deviceId: getMachineId(),
          deviceInfo: navigator.userAgent,
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

  return (
    <>
      <KakaoScript />
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div>로그인 처리 중...</div>
          <button 
            onClick={loginWithKakao}
            className="mt-4 px-4 py-2 bg-yellow-300 rounded-md"
          >
            카카오 로그인 재시도
          </button>
        </div>
      </div>
    </>
  )
}
