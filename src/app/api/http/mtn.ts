import { getMyInfo } from '../user'

export const getPayURL = async (
  amount: number,
  timestamp: string
): Promise<string> => {
  const user = await getMyInfo()
  const mtonetUrl = `https://passcall.co.kr:32837/cptl/gnrc-mob/pay
          ?membid=212603
          &cpid=0035
          &coinamt=${amount}
          &amount=${amount}
          &telno=07080169122
          &membnm=${user.name}
          &item=신사타 코인 ${amount}원
          &oid=${timestamp}
          &returnurl=http://api.sinsata.co.kr/api/v1/cash/returnUrl
          &formurl=http://www.sinsata.co.kr/my/cash`
  return mtonetUrl.replace(/\s/g, '')
}
