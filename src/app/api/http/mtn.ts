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
          &membnm=${user?.name}
          &item=신사타 코인 ${amount}원
          &oid=${timestamp}
          &returnurl=https://api.sinsata.co.kr/api/v1/mtn/complete
          &formurl=https://www.sinsata.co.kr/chats/inquiry/list`
  return mtonetUrl.replace(/\s/g, '')
}
