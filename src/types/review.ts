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
