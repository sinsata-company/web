export interface ApiResponse<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort2;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Sort2 {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface TeacherReserveHistoryDto {
  // 고객 정보
  customerName: string;
  customerId: string;
  
  // 현재 상담의 시작/종료 시간
  consultationStartTime: string; // ISO date string format
  consultationEndTime: string;   // ISO date string format
  
  // 예약 시작/종료 시간
  startTime: string;            // ISO date string format
  endTime: string;              // ISO date string format
  
  // 상담 통계
  totalConsultationCount: number;
  totalConsultationMinutes: number;   
  
  // 이전 상담 노트 목록 (노트가 있는 경우만)
  previousConsultationNotes: string[];
  
  // 리뷰 목록
  reviews: TeacherReviewDto[];
}

interface TeacherReviewDto {
  id: number;
  content: string;
  rating: number;
  createdAt: string;       // ISO date string format
  reviewerName: string;    // 리뷰 작성자 이름
}