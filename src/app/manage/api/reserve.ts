import { ReserveDto } from '@/app/api/data'
import { basicTeacherGet, basicTeacherPost } from './base'

export interface ReserveDetailDto {
  id: number
  teacherId: string
  teacherName: string
  userName: string
  startAt: string
  endAt?: any
  reserveType: string
  reserveCount: number
  reserveSeconds: number
  reserveNote?: any
  reserveDtos: ReserveDto[]
  reviewDto?: any
}

export const getReserveInfo = async (reserveId: string) => {
  const result = await basicTeacherGet<ReserveDetailDto>(
    '/manage/reserve/' + reserveId
  )
  return result
}

export const writeNote = async (reserveId: string, note: string) => {
  const result = await basicTeacherPost(
    '/manage/reserve/' + reserveId + '/note',
    {
      note,
    }
  )
  return result
}
