import { TeacherListDto } from '@/app/api/data'
import { basicTeacherGet, basicTeacherPost } from './base'

export const getMySummary = async () => {
  const result = (await basicTeacherGet('/manage/my/info')) as TeacherListDto
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
    noticeURL,
  })
}

export const updateInrtro = async (introduction: string) => {
  const result = await basicTeacherPost('/manage/my/intro', {
    introduction,
  })
}
