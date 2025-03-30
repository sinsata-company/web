import { getMyInfo } from '../user'

export const getPayURL = async (
  amount: number,
  timestamp: string
): Promise<string> => {
  const user = await getMyInfo()
  const mtonetUrl = `https://passcall.co.kr:32837/cptl/gnrc-mob/pay
          ?membid=${user?.mtnId}
          &cpid=0035
          &coinamt=${amount}
          &amount=${amount}
          &telno=${user?.phoneNum}
          &membnm=${encodeURIComponent(user?.name)}
          &item=${encodeURIComponent(`신사타 코인 ${amount}원`)}
          &oid=${timestamp}
          &returnurl=${encodeURIComponent('https://demo.apple-login-test.app:8080/api/v1/mtn/payment/request')}
          &formurl=${encodeURIComponent('https://demo.apple-login-test.app:8080/api/v1/mtn/payment/payment-complete')}`
  return mtonetUrl.replace(/\s/g, '')
}