import { BASE_URL } from '@/api/base'
import { getMyInfo } from '../user'
import { isMobileDevice } from '@/utils/device'

export const getPayURL = async (
  amount: number,
  timestamp: string
): Promise<string> => {
  const user = await getMyInfo()
  
  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  // URL 인코딩 처리
  const encodedName = encodeURIComponent(user.name)
  const encodedItem = encodeURIComponent(`신사타 코인 ${amount}원`)
  
  const mtonetUrl = `https://passcall.co.kr:32837/cptl/gnrc-${
    isMobileDevice() ? 'mob' : 'pc'
  }/pay?membid=${user.mtnId}\
    &cpid=0035\
    &coinamt=${amount}\
    &amount=${amount}\
    &telno=${user.phoneNum}\
    &membnm=${encodedName}\
    &item=${encodedItem}\
    &oid=${timestamp}\
    &returnurl=${apiUrl}/api/v1/mtn/complete\
    &formurl=${frontendUrl}/chats/inquiry/list`

  return mtonetUrl.replace(/\s+/g, '')
}