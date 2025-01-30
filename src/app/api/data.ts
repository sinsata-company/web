export interface TeacherListDto {
  id: string
  name: string
  summary: string
  teacherType: string
  hashtag: string
  thumbnail: string
}

export interface TeacherDetailDto {
  id: string
  name: string
  teacherType: string
  hashtag: string
  images: string[]
  introduction: string
  strongField: any
  canChat: boolean
  canCall: boolean
  notice: string
  noticeImgURI: string
  menu: string
}
