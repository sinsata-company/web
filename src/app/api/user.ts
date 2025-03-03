import { UserDto } from '@/types/user'
import { BASE_URL, basicUnpagedGet } from '../../api/base'
import axios from 'axios'
import { UserCredential } from 'firebase/auth'
import { isMobileDevice } from '@/utils/device'
import { basicDelete, basicGet, basicPut } from './base'

export const getMyInfo = async () => {
  const result = await basicUnpagedGet<UserDto>('/users/me')
  return result
}

export interface LoginProps {
  token: string
  name: string
  email: string | null
  isRegistered: boolean
  loginType: string
}

export const login = async (login: LoginProps) => {
  const response = await axios.post(
    BASE_URL + '/users/login',
    {
      ...login,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const data = response.data
  if (data.userStatus === 'WITHDRAW') {
    return false
  }
  const header = response.headers

  const accessToken = header['sst-access-token']
  const accessTokenExpireAt = header['sst-access-token-expire-at']
  const refreshToken = header['sst-refresh-token']
  const refreshTokenExpireAt = header['sst-refresh-token-expire-at']

  localStorage.setItem('sst-access-token', accessToken)
  localStorage.setItem('sst-access-token-expire-at', accessTokenExpireAt)
  localStorage.setItem('sst-refresh-token', refreshToken)
  localStorage.setItem('sst-refresh-token-expire-at', refreshTokenExpireAt)
  return true
}

export const loginAndJoin = async (info: UserCredential, provider: string) => {
  const response = await axios.post(
    BASE_URL + '/users/join',
    {
      name: info.user.displayName,
      loginType: provider,
      accessToken: info.user.uid,
      deviceId: getMachineId(),
      deviceInfo: 'Chrome',
      deviceType: isMobileDevice() ? 'Mobile' : 'Web',
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
  localStorage.setItem('sst-refresh-token-expire-at', refreshTokenExpireAt)
}

export const getKeyByEmail = async (
  name: string,
  act: string,
  provider: string
) => {
  const response = await axios.post(
    BASE_URL + '/users/key',
    {
      name: name,
      loginType: provider,
      accessToken: act,
      deviceId: getMachineId(),
      deviceInfo: 'Chrome',
      deviceType: isMobileDevice() ? 'Mobile' : 'Web',
      loginKey: name,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return response.data
}
export const loginByEmail = async (
  name: string,
  act: string,
  provider: string
) => {
  const response = await axios.post(
    BASE_URL + '/users/login',
    {
      name: name,
      loginType: provider,
      accessToken: act,
      deviceId: getMachineId(),
      deviceInfo: 'Chrome',
      deviceType: isMobileDevice() ? 'Mobile' : 'Web',
      loginKey: name,
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
  localStorage.setItem('sst-refresh-token-expire-at', refreshTokenExpireAt)
  return data
}

export const canUseId = async (name: string) => {
  const response = await axios.get(BASE_URL + '/users/nickname/' + name)
  return response.data
}

function getMachineId() {
  let machineId = localStorage.getItem('MachineId')

  if (!machineId) {
    machineId = crypto.randomUUID()
    localStorage.setItem('MachineId', machineId)
  }

  return machineId
}

export const withdraw = async () => {
  await basicDelete('/users/withdraw')
}

export const getEvent = async () => {
  const res = await basicGet<number>('/users/event')
  console.log(res)
  return res
}

export const updateprofile = async ({
  nickname,
  phoneNum,
}: {
  nickname: string
  phoneNum: string
}) => {
  await basicPut('/users/profile', {
    phoneNumber: phoneNum,
    nickname,
  })
}

export interface PayHistoryDto {
  payDttm: string
  payType: 'RESERVE' | 'LIVECHAT' | 'LIVECALL'
  payAmt: number
  teacherName: string
}

export const getPayHistory = async () => {
  return await basicUnpagedGet<PayHistoryDto[]>('/users/billing')
}
