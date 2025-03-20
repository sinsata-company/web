import { ApiResponse } from '@/types/api'
import axios from 'axios'

import _ from 'lodash'

// export const BASE_URL = 'http://localhost:8080/api/v1'
// export const BASE_WEB = 'http://localhost:3000'
// export const BASE_WS = 'ws://localhost:8080/chat/inbox'

// 환경 변수가 설정되지 않았을 경우의 기본값 설정
const DEFAULT_CONFIG = {
    API_BASE_URL: 'http://localhost:8080/api/v1',
    WEB_BASE_URL: 'http://localhost:3000',
    WS_BASE_URL: 'ws://localhost:8080/chat/inbox'
}

// 환경 변수에서 값을 가져오거나 기본값 사용
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_CONFIG.API_BASE_URL
export const BASE_WEB = process.env.NEXT_PUBLIC_WEB_BASE_URL || DEFAULT_CONFIG.WEB_BASE_URL
export const BASE_WS = process.env.NEXT_PUBLIC_WS_BASE_URL || DEFAULT_CONFIG.WS_BASE_URL

// 환경 변수 검증
if (process.env.NODE_ENV === 'production') {
    if (!process.env.NEXT_PUBLIC_API_BASE_URL || 
        !process.env.NEXT_PUBLIC_WEB_BASE_URL || 
        !process.env.NEXT_PUBLIC_WS_BASE_URL) {
        console.warn('Some production environment variables are not set!')
    }
}

export let token: string = ''

export const setToken = (tk: string) => {
  token = tk
  // console.log('asdf')
  // console.log('asdf')
}

function getAccessToken() {
  const expire = window.localStorage.getItem('sst-access-token-expire-at')
  if (expire && new Date().getTime() > parseInt(expire)) {
    window.location.href = `${BASE_WEB}/register`
    return null
  }
  return window.localStorage.getItem('sst-access-token')
}

function getTeacherToken() {
  const expire = window.localStorage.getItem('sst-teacher-token-expire-at')
  if (expire && new Date().getTime() > parseInt(expire)) {
    window.location.href = `${BASE_WEB}/register`
    return null
  }
  return window.localStorage.getItem('sst-teacher-token')
}

export async function basicUnpagedGet<T>(route: string): Promise<T> {
  const url = `${BASE_URL}${route}`

  const accessToken = getAccessToken()
  const response = await axios.get(url, {
    headers: {
      'SST-ACCESS-TOKEN': `${accessToken}`,
      'SST-TEACHER-TOKEN': `${accessToken}`,
    },
  })

  if (response.status == 200) {
    const data = response.data
    return data
  } else {
    throw '에러 발생'
  }
}

export async function basicUnpagedGetForInquiry<T>(route: string): Promise<T> {
  const url = `${BASE_URL}${route}`

  const accessToken = getAccessToken()
  const teacherToken = getTeacherToken()
  const response = await axios.get(url, {
    headers: {
      'SST-ACCESS-TOKEN': `${accessToken}`,
      'SST-TEACHER-TOKEN': `${teacherToken}`,
    },
  })

  if (response.status == 200) {
    const data = response.data
    return data
  } else {
    throw '에러 발생'
  }
}


export async function basicGet<T>(route: string): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${route}`

  // TODO jwt 갱신하거나 로그아웃 하는 방안
  const accessToken = getAccessToken()
  const teacherToken = getTeacherToken()
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'SST-ACCESS-TOKEN': accessToken || '',
        'SST-TEACHER-TOKEN': teacherToken || '',
      },
      validateStatus: function (status) {
        return status < 500; // 500 미만의 상태 코드는 에러로 처리하지 않음
      }
    })

    // 토큰이 만료된 경우 (403) 처리
    if (response.status === 403) {
      // 로컬 스토리지의 토큰 제거
      localStorage.removeItem('sst-access-token');
      localStorage.removeItem('sst-access-token-expire-at');
      localStorage.removeItem('sst-refresh-token');
      localStorage.removeItem('sst-refresh-token-expire-at');
      
      // 로그인 페이지로 리다이렉트
      window.location.href = '/register';
      return {} as ApiResponse<T>;
    }

    if (response.status === 500) {
      console.error('서버 에러:', response.data);
      throw new Error('서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }

    if (response.status == 200) {
      const data = response.data
      return data
    } else {
      throw '에러 발생'
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      throw '요청이 취소되었습니다'
    } else {
      throw error
    }
  }
}

export async function basicPost<T>(route: string, body: any): Promise<T> {
  const url = `${BASE_URL}${route}` // 데이터를 가져올 서버의 URL
  // TODO jwt 갱신하거나 로그아웃 하는 방안
  const accessToken = getAccessToken()
  const teacherToken = getTeacherToken()
  const response = await axios.post(url, body, {
    headers: {
      'SST-ACCESS-TOKEN': `${accessToken}`,
      'SST-TEACHER-TOKEN': `${teacherToken}`,
    },
  })

  if (response.status == 200) {
    const data = response.data
    return data
  } else {
    throw '에러 발생'
  }
}

export async function basicPut<T>(
  route: string,
  body: any
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${route}` // 데이터를 가져올 서버의 URL
  // TODO jwt 갱신하거나 로그아웃 하는 방안
  const accessToken = getAccessToken()
  const response = await axios.put(url, body, {
    headers: {
      'SST-ACCESS-TOKEN': `${accessToken}`,
      'SST-TEACHER-TOKEN': `${accessToken}`,
    },
  })

  if (response.status == 200) {
    const data = response.data
    return data
  } else {
    throw '에러 발생'
  }
}

export async function basicDelete<T>(route: string): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${route}`

  // TODO jwt 갱신하거나 로그아웃 하는 방안

  //   const accessToken = ''
  const accessToken = getAccessToken()
  const response = await axios.delete(url, {
    headers: {
      'SST-ACCESS-TOKEN': `${accessToken}`,
      'SST-TEACHER-TOKEN': `${accessToken}`,
    },
  })

  if (response.status == 200) {
    const data = response.data
    return data
  } else {
    throw '에러 발생'
  }
}
