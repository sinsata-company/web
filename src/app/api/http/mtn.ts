import { getMyInfo } from '../user'

export const getPayURL = async (
  amount: number,
  timestamp: string
): Promise<string> => {
  const user = await getMyInfo()
  
  // 부가세 10% 계산
  const vatAmount = Math.floor(amount * 0.1)  // 부가세 계산 (소수점 버림)
  const totalAmount = amount + vatAmount      // 총 결제 금액
  
  const mtonetUrl = `https://passcall.co.kr:32837/cptl/gnrc-mob/pay
          ?membid=${user?.mtnId}
          &cpid=0035
          &coinamt=${amount}         // 원래 금액
          &amount=${totalAmount}     // 부가세 포함된 총 금액
          &telno=${user?.phoneNum}
          &membnm=${encodeURIComponent(user?.name)}
          &item=${encodeURIComponent(`신사타 코인 ${amount}원`)}
          &oid=${timestamp}
          &returnurl=${encodeURIComponent('https://api.sinsata.co.kr/api/v1/mtn/payment/request')}
          &formurl=${encodeURIComponent('https://api.sinsata.co.kr/api/v1/mtn/payment/payment-complete')}`
          
  return mtonetUrl.replace(/\s/g, '')
}