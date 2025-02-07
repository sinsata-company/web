import { UserDto } from '@/types/user'
import { basicUnpagedGet } from './base'

export const getMyInfo = async () => {
  const result = await basicUnpagedGet<UserDto>('/users/me')
  return result
}
