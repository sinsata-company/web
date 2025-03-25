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
