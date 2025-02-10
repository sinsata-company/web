import { BASE_URL } from '@/api/base'
import { getMyInfo } from '../user'
import { isMobileDevice } from '@/utils/device'

export const getPayURL = async (
  amount: number,
  timestamp: string
): Promise<string> => {
  const user = await getMyInfo()
  const mtonetUrl = `https://passcall.co.kr:32837/cptl/gnrc-${
    isMobileDevice() ? 'mob' : 'pc'
  }/pay
          ?membid=212603
          &cpid=0035
          &coinamt=${amount}
          &amount=${amount}
          &telno=07080169122
          &membnm=${user.name}
          &item=신사타 코인 ${amount}원
          &oid=${timestamp}
          &returnurl=${BASE_URL}/cash/returnUrl
          &formurl=${BASE_URL}/mtn/complete`
  return mtonetUrl.replace(/\s/g, '')
}
