'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ReturnUrlPage() {
  const router = useRouter();

  useEffect(() => {
    const processPayment = async () => {
      try {
        // URL 파라미터에서 결제 결과 정보 추출
        const urlParams = new URLSearchParams(window.location.search);
        const paymentResult = {
          oid: urlParams.get('oid'),
          resultCode: urlParams.get('resultCode'),
          // 기타 필요한 결제 결과 정보
        };

        if (paymentResult.resultCode === '0000') { // 실제 성공 코드는 엠투넷 문서 참고
          // 결제 완료 처리
          const response = await fetch('/api/value-added/complete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentResult)
          });

          if (response.ok) {
            // 성공 페이지로 이동
            router.push('/my/menus/valueAdded/complete');
          } else {
            throw new Error('결제 완료 처리 실패');
          }
        } else {
          throw new Error('결제 실패');
        }
      } catch (error) {
        console.error('결제 완료 처리 중 오류:', error);
        router.push('/my/menus/valueAdded/fail');
      }
    };

    processPayment();
  }, []);

  return <div>결제 처리 중...</div>;
} 