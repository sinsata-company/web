'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import router from 'next/router';
import { getPayURL } from './mtn';

const PaymentPage = () => {
  const searchParams = useSearchParams();
  
  const handlePaymentComplete = (payload: any) => {
    // 결제 완료 처리
    console.log('Payment completed:', payload);
  };

  const handlePaymentError = (error: any) => {
    // 결제 실패 처리
    console.error('Payment failed:', error);
  };

  useEffect(() => {
    // 브로드캐스트 채널 생성
    const channel = new BroadcastChannel('payment_channel');
    
    channel.onmessage = (event) => {
        if (event.data.type === 'PAYMENT_COMPLETE') {
            const { status } = event.data.payload;
            
            // 결제 성공 시 채팅 목록 페이지로 이동
            if (status === 'SUCCESS') {
                router.push('/chats/inquiry/list');
            }
        }
    };

    return () => channel.close();
  }, []);

const handlePayment = () => {
    // 결제창을 백엔드 URL로 열기
    getPayURL() .then((url) => {
        window.open(url, 'payment', 'width=500,height=700');
    });
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">결제 진행 중</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <p>상품명: {searchParams.get('productName')}</p>
        <p>결제금액: {Number(searchParams.get('amount')).toLocaleString()}원</p>
        {/* 결제 진행 상태 표시 */}
      </div>
    </div>
  );
};

export default PaymentPage;