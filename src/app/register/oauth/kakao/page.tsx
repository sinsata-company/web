'use client'

import axios from 'axios'
import { machine } from 'os'

import { useEffect } from 'react'

export default function KakaoRedirect() {
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
          'http://localhost:8080/api/v1/users/join',
          {
            loginType: 'KAKAO',
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
        console.log('Access Token:', data.accessToken)
      } catch (error) {
        console.error('Error fetching token:', error)
      }
    }

    fetchToken()
  }, [])

  return <div>로그인 처리 중...</div>
}
