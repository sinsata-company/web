export interface TeacherListDto {
  id: string
  name: string
  summary: string
  teacherType: string
  hashtag: string
  thumbnail: string
  canChat: boolean
  canCall: boolean
  status: number
  pinNumber: string
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
  reviews: any[]
  pinNumber: string
}

export interface CashHistoryDto {
  teacherName: string
  teacherProfile?: any
  roomId: string
  lastMsg: string
  startAt: string
  endAt: string
  status: string
}

export interface ChatDto {
  teacherName: string
  teacherProfile?: any
  userName: string
  userLevel: string
  roomId: string
  lastMsg: string
  startAt: string
  endAt: string
  status: string
}
export interface ReserveDto {
  id: number
  teacherId: string
  userName: string
  startAt: string
  customerName: string
  endAt: string
  reserveType: string
  thumbnail: any
  teacherPin: string
  chatroomId?: string
}

export interface IMessage {
  roomId: string
  authorId: string
  message: string
  id: number
  createdAt: string
  level: string
  nickname: string
}
