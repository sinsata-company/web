'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MTNCompletePage() {
  const router = useRouter()

  useEffect(() => {
    // URL 파라미터에서 결제 결과 확인
    const searchParams = new URLSearchParams(window.location.search)
    const resultCode = searchParams.get('req_result')

    // if (resultCode === '0000') {
    //   // 결제 성공 시 홈으로 리다이렉션
    //   router.push('/home')
    // }

    router.push('/home')    
    // } else {
    //   // 결제 실패 시 에러 처리 또는 다른 페이지로 리다이렉션
    //   router.push('/cash?error=payment_failed')
    // }
  }, [router])

  return <div>결제 처리 중...</div>
} 