import { BASE_URL, basicPost } from '@/api/base'
import axios from 'axios'
import { basicTeacherDelete } from './base'

export const loginTeacher = async (pinNumber: string, password: string) => {
  const response = await axios.post(
    BASE_URL + '/manage/auth/login',
    {
      pinNumber,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const header = response.headers

  console.log(header)
  const accessToken = header['sst-teacher-token']
  const accessTokenExpireAt = header['sst-teacher-token-expire-at']

  localStorage.setItem('sst-teacher-token', accessToken)
  localStorage.setItem('sst-teacher-token-expire-at', accessTokenExpireAt)
}

export const withdraw = async () => {
  await basicTeacherDelete(BASE_URL + '/manage/auth/withdraw')
}
