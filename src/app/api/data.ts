import { basicGet, basicPost } from "@/api/base"
import { TeacherReviewDetails } from "@/types/review"
import { UserDto } from "@/types/user"

export interface TeacherListDto {
  id: string
  name: string
  summary: string
  teacherType: 'TARO' | 'MIND' | 'SINJEOM' | 'SAJU'
  hashtag: string
  thumbnail: string
  canChat: boolean
  canCall: boolean
  status: string;
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
  reviews: TeacherReviewDetails[]
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
  unreadCount: number;
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
  unreadCount?: number
  status?: string
}

export interface IMessage {
  roomId: string
  authorId: string
  message: string
  id: number
  createdAt: string
  isTeacher: boolean
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

export interface ProductInquiryMessage {
  id: string;
  message: string;
  authorId: string;
  isConsultant: boolean;
  nickname: string;
  createdAt: string;
  productId?: string;
  productName?: string;
}

export interface UserLevel {
  id: number;
  name: string;
  level: number;
}

export interface ChatStatus {
  code: string;
  name: string;
}

export interface InquiryStatus {
  code: string;
  name: string;
}

export interface TeacherChatInquiryItem {
  id: string;
  type: 'CHAT' | 'INQUIRY';
  userId: string;
  userName: string;
  userLevel: UserLevel;
  createdAt: string;
  
  // Chat 관련 필드
  roomId?: string;
  chatStatus?: ChatStatus;
  lastMessage?: string;
  startAt?: string;
  endAt?: string;
  reserveId?: number;
  unreadCount?: number;
  
  // Inquiry 관련 필드
  inquiryContent?: string;
  inquiryStatus?: string;
}

export interface TeacherChatInquiryDto {
  id: string;
  type: 'CHAT' | 'INQUIRY';
  userId: string;
  userName: string;
  users: UserDto;
  userLevel: string;
  products: VaProductDto;
  createdAt: string;
  
  // Chat 관련 필드
  roomId?: string;
  chatStatus?: ChatStatus;
  lastMessage?: string;
  startAt?: string;
  endAt?: string;
  reserveId?: number;
  
  // Inquiry 관련 필드
  inquiryContent?: string;
  inquiryStatus?: string;
  
  // 통계 필드
  totalUnreadCount: number;
  totalPendingCount: number;
  items: TeacherChatInquiryItem[];
}

export interface VaProductDto {
  id: string;
  productName: string;
  price: number;
  productImage: string;
}

export interface CutomerChatInquiryDto {
  id: string;
  type: 'CHAT' | 'INQUIRY';
  userId: string;
  userName: string;
  teacherProfileImage: string;
  title: string;
  inquiryNumber: string;
  unreadCount: number;
  createdAt: string;
  teachers: Teachers;
  products : VaProductDto;
  status: 'PENDING' | 'CONFIRMED';
}

export interface InquiryResponseDto {
  id: number;
  teacherId: string;
  userId: string;
  userContent: string;
  teacherContent: string | null;
  status: string;
  createdAt: string;
}

// API 호출 함수
export const getInquiryList = async (): Promise<TeacherChatInquiryDto> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inquiries`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('sst-access-token')}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch inquiry list');
  }

  return response.json();
};

// 선생님 자신이 참여한 모든 채팅 목록 조회
export const getTeacherAll = async () => {
  return await basicGet<TeacherChatInquiryDto>(`/chats/teacher/all`);
};

// 고객이 자신이 참여한 모든 채팅 목록 조회
export const getCustomerAll = async () => {
  return await basicGet<CutomerChatInquiryDto>(`/chats/customer/all`);
}
