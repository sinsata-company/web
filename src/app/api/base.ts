import { BASE_URL } from '@/api/base'
import axios from 'axios'
import _ from 'lodash'

export let token: string = ''

export const setToken = (tk: string) => {
  token = tk
}

class LW_API {}

function getAccessToken() {
  return window.localStorage.getItem('sst-access-token')
}

export const basicNotAuthorizedGet = _.debounce(
  async function <T>(route: string) {
    const url = `${BASE_URL}${route}`

    // TODO jwt 갱신하거나 로그아웃 하는 방안

    const response = await axios.get(url)

    if (response.status == 200) {
      const data = response.data
      return data as T
    } else {
      throw '에러 발생'
    }
  },
  300,
  { leading: true, trailing: false }
)

export const basicGet = _.debounce(
  async function <T>(route: string) {
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
      return data as T
    } else {
      throw '에러 발생'
    }
  },
  500,
  { leading: true, trailing: false }
)

export async function basicPost(route: string, body: any) {
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

export async function basicPut(route: string, body: any) {
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

export async function basicDelete(route: string) {
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
