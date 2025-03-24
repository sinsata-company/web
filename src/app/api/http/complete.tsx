import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function CompletePage() {
  const router = useRouter();
  const params = useParams();
 
  useEffect(() => {
    // URL 파라미터 확인
    const { req_result, oid, amount } = params;
    
    if (req_result === '0000') {
      // 결제 성공 처리
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/mtn/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oid, amount }),
        credentials: 'include'
      })
      .then(() => {
        // 성공 페이지로 리다이렉트
        router.push('/chats/inquiry/list');
      })
      .catch((error) => {
        console.error('Payment verification failed:', error);
        // 에러 페이지로 리다이렉트
        router.push('/error');
      });
    } else {
      // 결제 실패 시 처리
      router.push('/payment/failed');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>결제 처리 중입니다. 잠시만 기다려주세요...</p>
    </div>
  );
}