export type ReviewDetails = {
	reviewerName: string;
	createdAt: string;
	star: number;
	contents: string;
}


export type Reviewable = {
	reservationId: number;
	teacherId: string;
	teacherPinNumber: string;
	teacherName: string;
	teacherProfileImage: string;
	startAt: string;
	endAt: string;
	status: 'ACTIVE' | 'CANCELED' | 'COMPLETED';
}

export type ReviewCompletion = {
	id: number;
	userId: string;
	userName: string;
	startAt: string;
	endAt: string;
	teacherId: string;
	teacherName: string;
	pinNumber: string;
	reservationId: number;
	type: 'CALL' | 'CHAT';
	teacherProfileUrl: string;
	rating: number;
	category: string;
	style: string;
	content: string;
	imageUrl: string | null;
	createdAt: string;
	updatedAt: string;
}

// 날짜 관련 타입 (Java의 LocalDateTime에 해당)
type LocalDateTime = string; // ISO 형식의 날짜 문자열로 표현

// 리뷰 DTO 인터페이스
export interface TeacherReviewDetails {
  id: number;
  userName: string;
  style: string;
  category: string;
  content: string;
  imageUrl: string;
  rating: number;
  timeRange: string;
  likeCount: number;
  date: LocalDateTime;
}
