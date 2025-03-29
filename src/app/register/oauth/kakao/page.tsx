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
      const code = new URL(window.location.href).searchParams.get('code')
      console.log("code", code)
      try {
        const response = await basicPost('/users/key', {
            loginType: 'KAKAO',
            accessToken: code,
            deviceId: getMachineId(),
            deviceInfo: 'Chrome',
            deviceType: 'Android',
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
