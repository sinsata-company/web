import { ReserveDto } from '@/app/api/data'
import { basicTeacherGet } from './base'
import { basicGet } from '@/api/base'

export const getHomeCash = async () => {
  const result = await basicTeacherGet<number>('/manage/home/cash')
  return result
}

export const getReserveByDate = async (date: string) => {
  const result = await basicTeacherGet<ReserveDto[]>(
    '/manage/home/reserve?date=' + date
  )
  return result
}

export const startChat = async (roomid: string) => {
  const result = await basicTeacherGet<ReserveDto[]>(
    `/manage/home/chat/${roomid}/start`
  )
  return result
}
export const endChat = async (roomid: string) => {
  const result = await basicTeacherGet<ReserveDto[]>(
    `/manage/home/chat/${roomid}/end`
  )
  return result
}

export const endChatByUser = async (roomid: string) => {
  const result = await basicGet<ReserveDto[]>(
    `/manage/home/chat/user/${roomid}/end`
  )
  return result
}
