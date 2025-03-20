export interface TeacherListDto {
  id: string
  name: string
  summary: string
  teacherType: 'TARO' | 'MIND' | 'SINJEOM' | 'SAJU'
  hashtag: string
  thumbnail: string
  canChat: boolean
  canCall: boolean
  status: number
  pinNumber: string
  reviewCount: number
  score: number | null
  scoreLen: number | null
  rating: number
  menu: string
  likedCnt: number
  selfLiked: boolean;
  likedTeachers: Array<{ testId: string; teacherId: string; }>
}

export interface TeacherDetailDto {
  id: string
  name: string
  teacherType: string
  hashtag: string
  images: string[]
  introduction: string
  totalReviews: number
  totalRating: number
  strongField: any
  canChat: boolean
  canCall: boolean
  notice: string
  noticeImgURI: string,
  qna: { question: string, answer: string }[];
  menu: string
  reviews: any[]
  pinNumber: string
  likedCnt: number | null;
  selfLiked: boolean;
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

export interface VaDto {
  createdDateTime?: string
  modifiedDateTime?: string
  id?: number
  productName: string
  productDetails: string
  productImage: string
  price: number
  productDate: string
  productWay: string
  productInfo: string
  productNote: string
  teachers?: Teachers
}

export interface VaPayDto {
  createdDateTime?: string
  modifiedDateTime?: string
  id?: number
  productName: string
  productImage: string
  price: number
  productInfo: string
  userName: string
  nickName: string
  address: string
  teachers?: Teachers
}

export interface Teachers {
  id: string
  pinNumber: string
  password: string
  name: string
  mtnId: string
  phoneNumber: string
  hashtag: string
  thumbnailURI: any
  summary: string
  teacherType: string
  canChat: boolean
  canCall: boolean
  status: string
  viewCnt: number
  reserveCnt: number
  rating: number
  ratingCnt: number
  createdDateTime: string
  modifiedDateTime: string
}

export interface UnavailableTimeDTO {
  teacherId: number;
  date: string;      // 'YYYY-MM-DD' 형식
  times: string[];   // 'HH:mm' 형식의 시간 배열
}

// 응답 타입이 필요한 경우를 위한 추가 인터페이스
export interface UnavailableTimeResponse {
  id: number;
  teacherId: number;
  date: string;
  time: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UnavailableTime {
  id: number;
  teacherId: number;
  date: string;
  time: string;
}
