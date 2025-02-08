'use client'

import { BASE_URL } from '@/api/base'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

export default function NaverRedirect() {
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
      const code = new URL(window.location.href).searchParams.get('code') || ''
      const state =
        new URL(window.location.href).searchParams.get('state') || ''

      try {
        // google 에서 id token 을 받아서 서버로 전송

        const response = await axios.post(
          BASE_URL + '/users/join',
          {
            loginType: 'NAVER',
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

        const data = response.data
        const header = response.headers

        const accessToken = header['sst-access-token']
        const accessTokenExpireAt = header['sst-access-token-expire-at']
        const refreshToken = header['sst-refresh-token']
        const refreshTokenExpireAt = header['sst-refresh-token-expire-at']

        localStorage.setItem('sst-access-token', accessToken)
        localStorage.setItem('sst-access-token-expire-at', accessTokenExpireAt)
        localStorage.setItem('sst-refresh-token', refreshToken)
        localStorage.setItem(
          'sst-refresh-token-expire-at',
          refreshTokenExpireAt
        )
        router.push('/home')
      } catch (error) {
        console.error('Error fetching token:', error)
      }
    }

    fetchToken()
  }, [])

  return <div>로그인 처리 중...</div>
}
