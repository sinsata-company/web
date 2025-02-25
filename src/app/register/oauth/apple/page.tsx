'use client'

import { BASE_URL } from '@/api/base'
import { login } from '@/app/api/user'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

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
        const response = await axios.post(
          BASE_URL + '/users/key',
          {
            loginType: 'APPLE',
            accessToken: code,
            deviceId: getMachineId(),
            deviceInfo: 'Chrome',
            deviceType: 'Android',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        if (response.data && response.data.isRegistered) {
          await login(response.data)
          router.push('/home')
        } else {
          router.push(`/register/info?key=${JSON.stringify(response.data)}`)
        }
      } catch (error) {
        console.error('Error fetching token:', error)
      }
    }

    fetchToken()
  }, [])

  return <div>로그인 처리 중...</div>
}
