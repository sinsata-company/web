'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { handlePaymentRedirect } from '@/api/http/mtn'

export default function PaymentRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    const processPayment = async () => {
      try {
        // URL 파라미터에서 결제 정보 추출
        const urlParams = new URLSearchParams(window.location.search)
        const paymentData = {
          orderId: urlParams.get('oid'),
          amount: urlParams.get('amount'),
          status: urlParams.get('status'),
          // 필요한 다른 파라미터들 추가
        }

        // 결제 처리
        await handlePaymentRedirect(paymentData)

        // 성공 페이지로 리다이렉트
        router.push('/payment/success')
      } catch (error) {
        console.error('Payment processing failed:', error)
        // 실패 페이지로 리다이렉트
        router.push('/payment/failure')
      }
    }

    processPayment()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-4">결제 처리 중...</h1>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  )
} 