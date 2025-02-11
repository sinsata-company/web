import { BASE_URL } from '@/api/base'
import axios from 'axios'

function getAccessToken() {
  return window.localStorage.getItem('sst-teacher-token')
}

export async function basicTeacherGet<T>(route: string) {
  const url = `${BASE_URL}${route}`

  // TODO jwt 갱신하거나 로그아웃 하는 방안
  const accessToken = getAccessToken()
  const response = await axios.get(url, {
    headers: {
      'SST-TEACHER-TOKEN': `${accessToken}`,
    },
  })

  if (response.status == 200) {
    const data = response.data
    return data as T
  } else {
    throw '에러 발생'
  }
}

export async function basicTeacherPost(route: string, body: any) {
  const url = `${BASE_URL}${route}` // 데이터를 가져올 서버의 URL
  // TODO jwt 갱신하거나 로그아웃 하는 방안
  const accessToken = getAccessToken()
  const response = await axios.post(url, body, {
    headers: {
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

export async function basicTeacherPut(route: string, body: any) {
  const url = `${BASE_URL}${route}` // 데이터를 가져올 서버의 URL
  // TODO jwt 갱신하거나 로그아웃 하는 방안
  const accessToken = getAccessToken()
  const response = await axios.put(url, body, {
    headers: {
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

export async function basicTeacherDelete(route: string) {
  const url = `${BASE_URL}${route}`

  // TODO jwt 갱신하거나 로그아웃 하는 방안

  //   const accessToken = ''
  const accessToken = getAccessToken()
  const response = await axios.delete(url, {
    headers: {
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
