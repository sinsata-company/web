import { basicPost } from '../../../api/base'
import { basicTeacherGet, basicTeacherPost } from './base'

interface ApplyTeacherProps {
  password: string
  name: string
  phoneNumber: string
  imageList: string[]
  hashtag: string
  introduction: string
  teacherType: string
  strongField: string
  reviews: []
}
const teacherTypeMap: { [key: string]: string } = {
  신점: 'SINJEOM',
  사주: 'SAJU',
  타로: 'TARO',
  심리: 'MIND',
}

export const applyTeacher = async (request: ApplyTeacherProps) => {
  const convertedTeacherType = teacherTypeMap[request.teacherType]
  if (!convertedTeacherType) {
    throw new Error('Invalid teacherType')
  }
  const result = await basicPost('/teachers/join', {
    ...request,

    teacherType: convertedTeacherType,
  })
  return result
}

export const getCanStatus = async () => {
  const result = await basicTeacherGet('/manage/home/can')
  return result
}

export const updateCanStatus = async (can: boolean, type: 'call' | 'chat') => {
  const result = await basicTeacherPost('/manage/home/can', {
    can,
    type,
  })
}
