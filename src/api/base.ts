import { ApiResponse } from '@/types/api'
import axios from 'axios'

// export const BASE_URL = 'http://localhost:8080/api/v1'
// export const BASE_WEB = 'http://localhost:3000'
export const BASE_URL = 'https://api.sinsata.co.kr/api/v1'
export const BASE_WEB = 'https://www.sinsata.co.kr'
export const BASE_WS = 'wss://api.sinsata.co.kr/chat/inbox'

export let token: string = ''

export const setToken = (tk: string) => {
  token = tk
}

function getAccessToken() {
  const expire = window.localStorage.getItem('sst-access-token-expire-at')
  if (expire && new Date().getTime() > parseInt(expire)) {
    window.location.href = `${BASE_WEB}/register`
    return null
  }
  return window.localStorage.getItem('sst-access-token')
}

export async function basicUnpagedGet<T>(route: string): Promise<T> {
  const url = `${BASE_URL}${route}`

  // TODO jwt 갱신하거나 로그아웃 하는 방안
  const accessToken = getAccessToken()
  const response = await axios.get(url, {
    headers: {
      'SST-ACCESS-TOKEN': `${accessToken}`,
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
  const response = await axios.get(url, {
    headers: {
      'SST-ACCESS-TOKEN': `${accessToken}`,
    },
  })

  if (response.status == 200) {
    const data = response.data
    return data
  } else {
    throw '에러 발생'
  }
}

export async function basicPost<T>(route: string, body: any): Promise<T> {
  const url = `${BASE_URL}${route}` // 데이터를 가져올 서버의 URL
  // TODO jwt 갱신하거나 로그아웃 하는 방안
  const accessToken = getAccessToken()
  const response = await axios.post(url, body, {
    headers: {
      'SST-ACCESS-TOKEN': `${accessToken}`,
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
    },
  })

  if (response.status == 200) {
    const data = response.data
    return data
  } else {
    throw '에러 발생'
  }
}
