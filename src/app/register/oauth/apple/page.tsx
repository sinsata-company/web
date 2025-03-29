'use client'

import { basicPost } from '@/app/api/base'
import { login } from '@/app/api/user'
import { useRouter } from 'next/navigation'

import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '@/api/base'

export default function AppleRedirect() {
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
      const code = new URL(window.location.href).searchParams.get('code')
      try {
        const response = await basicPost(
'/users/key',
          {
            loginType: 'APPLE',
            accessToken: code,
            deviceId: getMachineId(),
            deviceInfo: 'Chrome',
            deviceType: 'Android',
          }
        )
        console.log("response", response)
        if (response && response?.isRegistered) {
          await login(response)
          router.push('/home')
        } else {
          router.push(`/register/info?key=${JSON.stringify(response)}`)
        }
      } catch (error: any) {
        console.error('Error during Apple login:', error)
        
        // 토큰 만료 에러 처리
        if (error.response?.data?.includes('APPLE_API_CALL_ERROR_BY_EXPIRE_TOKEN') ||
            error.response?.data?.includes('invalid_grant')) {
          alert('인증 정보가 만료되었습니다. 다시 로그인해 주세요.')
        } else {
          alert('애플 로그인 중 오류가 발생했습니다. 다시 시도해 주세요.')
        }
        
        router.push('/login')
      }
    }

    fetchToken()
  }, [])

  return <div>로그인 처리 중...</div>
}
