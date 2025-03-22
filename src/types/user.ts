export interface UserDto {
  userId: string
  loginDeviceId: number
  name: string
  nickname: string
  loginType: string
  level: string
  mtnId: string
  phoneNum: string
  isParticipatedEvent: boolean
  createdAt: string
  type: 'USER' | 'TEACHER';
  likedTeachers: Array<any>;
  profileImage: string
}
