import { basicTeacherGet } from '@/app/manage/api/base'
import { ReserveDto } from '@/app/api/data'

export const getTeacherReservations = async () => {
  return basicTeacherGet<ReserveDto[]>(`/reserve/teacher/me`);
}
  