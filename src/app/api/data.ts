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
  reviewCount: number
  rating: number
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
  teacherType: 'TARO' | 'MIND' | 'SINJEOM' | 'SAJU'
  roomId: string
  lastMsg: string
  startAt: string
  endAt: string
  status: string
}

export interface ChatDto {
  teacherName: string
  teacherType: 'TARO' | 'MIND' | 'SINJEOM' | 'SAJU'
  teacherProfile?: any
  userName: string
  userLevel: string
  roomId: string
  lastMsg: string
  startAt: string
  endAt: string
  status: string
  reserveId: number
}

export interface ChatRoomRes {
  userId: string
  teacherId: string
  chatRoomId: string
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
  note: string
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
