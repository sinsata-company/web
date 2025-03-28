import {UserDto} from '@/types/user'
import {BASE_URL, basicUnpagedGet, basicUnpagedGetForInquiry} from '../../api/base'
import axios, {isAxiosError} from 'axios'
import {UserCredential} from 'firebase/auth'
import {isMobileDevice} from '@/utils/device'
import {basicDelete, basicGet, basicPut, basicPost} from './base'
import { InquiryResponseDto } from '@/app/api/data'
import { basicTeacherGet } from '../manage/api/base'

export const getMyInfo = async () => {
  const result = await basicUnpagedGet<UserDto>('/users/me')
  return result
}

export const getMyInfoByTeacher = async () => {
  const result = await basicTeacherGet<UserDto>('/users/me/teacher')
  return result
}

export const getMyInquiryInfo = async () => {
  const result = await basicUnpagedGetForInquiry<UserDto>('/chats/inquiry/me')
  return result
}

export const getInquiryDetails = async (id: number) => {
  const result = await basicUnpagedGetForInquiry<InquiryResponseDto>(`/inquiries/${id}`)
  console.log('result', result)
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

export const canUseIdAndMessage = async (email: string) => {
    try {
  const response = await axios.get(BASE_URL + '/users/nickname/' + email)
        return {
            status: response.data,
            message: ''
        }
    } catch (error) {
        if(isAxiosError(error)) {
            return {
                status: false,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                message: error?.response.data?.message
            }
        }
    }
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

export const verifyPassword = async (password: string) => {
  const response = await basicPost('/users/verify-password', {
    password,
  })
  return response.data
}

export const changePassword = async (currentPassword: string, newPassword: string) => {
  const response = await basicPost('/users/change-password', {
    currentPassword,
    newPassword,
  })
  return response.data
}

