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
  
  // 백그라운드 리다이렉트를 위한 중간 페이지 URL
  const redirectUrl = `${frontendUrl}/payment/redirect`
  
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
    &returnurl=${encodeURIComponent(redirectUrl)}\
    &formurl=${encodeURIComponent(apiUrl + '/api/v1/mtn/complete')}`

  return mtonetUrl.replace(/\s+/g, '')
}

// 새로운 리다이렉트 핸들러 추가
export const handlePaymentRedirect = async (paymentData: any) => {
  try {
    // 서버에 결제 정보 전송
    const response = await fetch('/api/v1/mtn/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })
    
    if (!response.ok) {
      throw new Error('Payment processing failed')
    }

    // 결제 완료 후 처리
    return response.json()
  } catch (error) {
    console.error('Payment redirect handling failed:', error)
    throw error
  }
}