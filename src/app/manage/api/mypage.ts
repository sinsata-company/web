import { TeacherListDto, VaDto } from '@/app/api/data'
import { basicTeacherGet, basicTeacherPost } from './base'

export const getMySummary = async () => {
  const result = (await basicTeacherGet('/manage/my/info')) as TeacherListDto
  return result
}

export const getMenu = async (menu: string) => {
  const result = await basicTeacherGet<string>('/manage/my/menu')
  return result
}

export const getMenuPrepay = async () => {
  const result = await basicTeacherGet<string>('/manage/my/menu/fix')
  return result
}

export interface Prepay {
  chatPrepay: number
  callPrePay: number
}

export const updatePrepay = async (prepay: Prepay) => {
  const result = await basicTeacherPost('/manage/my/menu/fix', prepay)
  return result
}

export const updateMenu = async (menu: string) => {
  const result = await basicTeacherPost('/manage/my/menu', {
    menus: menu,
  })
}

export const updateHash = async (hashtag: string) => {
  const result = await basicTeacherPost('/manage/my/hashtag', {
    hashtag,
  })
}

export const updateNotice = async (notice: string, noticeURL: string) => {
  const result = await basicTeacherPost('/manage/my/notice', {
    notice,
    imageUrls: noticeURL,
  })
}

export const getIntro = async (): Promise<string> => {
  const result = await basicTeacherGet<string>('/manage/my/intro')
  return result
}

export const updateInrtro = async (introduction: string) => {
  const result = await basicTeacherPost('/manage/my/intro', {
    introduction,
  })
}

export const getStrong = async (): Promise<string> => {
  const result = await basicTeacherGet<string>('/manage/my/strong')
  return result
}
export const updateStrong = async (strongField: string) => {
  const result = await basicTeacherPost('/manage/my/strong', {
    strongField,
  })
}

export const getQna = async (): Promise<string> => {
  const result = await basicTeacherGet<string>('/manage/my/qna')
  return result
}
export const updateQna = async (qna: string) => {
  const result = await basicTeacherPost('/manage/my/qna', {
    qna,
  })
}

export interface VADto {}

export const getVas = async (): Promise<VaDto[]> => {
  const result = await basicTeacherGet<VaDto[]>('/manage/my/va')
  return result
}

export const updateVas = async ({
  name,
  details,
  price,
  image,
}: {
  name: string
  details: string
  price: string
  image: string
}): Promise<string> => {
  const result = await basicTeacherPost('/manage/my/va', {
    name,
    details,
    price,
    image,
  })
  return result
}
