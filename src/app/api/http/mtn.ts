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
          ?membid=${user?.mtnId}
          &cpid=0035
          &coinamt=${amount}
          &amount=${amount}
          &telno=${user?.phoneNum}
          &membnm=${encodeURIComponent(user?.name)}
          &item=${encodeURIComponent(`신사타 코인 ${amount}원`)}
          &oid=${timestamp}
          &returnurl=${encodeURIComponent('https://api.sinsata.co.kr/api/v1/mtn/payment/request')}
          &formurl=${encodeURIComponent('https://api.sinsata.co.kr/api/v1/mtn/payment/payment-complete')}`
  return mtonetUrl.replace(/\s/g, '')
}