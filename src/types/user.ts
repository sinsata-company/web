export interface UserDto {
  userId: string
  email: string
  loginDeviceId: number
  name: string
  socialToken: string
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
