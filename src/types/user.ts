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
  likedTeachers: Array<any>;
}
