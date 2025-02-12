'use client'

import { BASE_URL, BASE_WEB } from '@/api/base'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

export default function GoogleRedirect() {
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
        // google 에서 id token 을 받아서 서버로 전송
        const tokenResponse = await fetch(
          'https://oauth2.googleapis.com/token',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              client_id:
                '387467142815-acmspfmbq3mhjf55eqa3a03ervu2g0ig.apps.googleusercontent.com',
              client_secret: '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',
              code,
              redirect_uri: BASE_WEB + '/register/oauth/google',
              grant_type: 'authorization_code',
            }),
          }
        )
        const tokenData = await tokenResponse.json()

        const response = await axios.post(
          BASE_URL + '/users/join',
          {
            loginType: 'GOOGLE',
            accessToken: tokenData.id_token,
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

        if (accessToken) {
          if (window.opener) {
            // 부모 창(원래 창)에 메시지 전송
            window.opener.postMessage(
              { accessToken: accessToken, origin: 'sst' },
              BASE_WEB
            )

            // 새 창 닫기
            window.close()
          } else {
            console.error('No opener window found.')
          }
        }
      } catch (error) {
        console.error('Error fetching token:', error)
      }
    }

    fetchToken()
  }, [])

  return <div>로그인 처리 중...</div>
}
