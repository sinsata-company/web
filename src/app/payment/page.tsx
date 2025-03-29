'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

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
    // 결제 정보 가져오기
    const amount = searchParams.get('amount');
    const productName = searchParams.get('productName');
    const productId = searchParams.get('productId');
    const paymentId = searchParams.get('paymentId');

    // 브로드캐스트 채널 생성
    const channel = new BroadcastChannel('payment_channel');

    // 메시지 수신 리스너
    channel.onmessage = (event) => {
      console.log('Received payment message:', event.data);
      if (event.data.type === 'PAYMENT_COMPLETE') {
        handlePaymentComplete(event.data.payload);
      } else if (event.data.type === 'PAYMENT_ERROR') {
        handlePaymentError(event.data.error);
      }
    };

    // 결제 초기화 메시지 전송
    channel.postMessage({
      type: 'PAYMENT_INIT',
      payload: {
        paymentId,
        amount,
        productName,
        productId,
        timestamp: new Date().toISOString()
      }
    });

    // 컴포넌트 언마운트 시 채널 정리
    return () => {
      channel.close();
    };
  }, [searchParams]);

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