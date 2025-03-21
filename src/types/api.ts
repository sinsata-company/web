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

export interface ReservationHistory {
  content: string;
  reservationTime: string;
}

export interface TeacherReserveHistoryDto {
  // 고객 정보
  customerName: string;
  customerId: string;

  reservationId: number;
  
  // 현재 상담의 시작/종료 시간
  consultationStartTime: string; // ISO date string format
  consultationEndTime: string;   // ISO date string format
  
  // 예약 시작/종료 시간
  startTime: string;            // ISO date string format
  endTime: string;              // ISO date string format
  type: string;
  
  // 상담 통계
  totalConsultationCount: number;
  totalConsultationMinutes: number;   
  
  histories: ReservationHistory[];
  currentNote: string;
  
  // 리뷰 목록
  reviews: TeacherReviewDto[];
  status: string;
}

export interface TeacherReviewDto {
  contents: string;
  star: number;
  createdAt: string;       // ISO date string format
  reviewerName: string;    // 리뷰 작성자 이름
}