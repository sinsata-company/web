'use client';

import { useRouter } from 'next/navigation'
import { getPayURL } from '@/app/api/http/mtn'
import { basicPost } from '@/app/api/base'
import { VaCustomerDto } from '@/app/api/cash'

interface PaymentHandlerProps {
  vaInfo: VaCustomerDto;
  setIsProcessing: (isProcessing: boolean) => void;
}

export const handlePayment = async ({ 
  vaInfo, 
  setIsProcessing,
  router 
}: PaymentHandlerProps & { router: ReturnType<typeof useRouter> }) => {
  try {
    setIsProcessing(true);
    const timestamp = new Date().getTime().toString();

    // 브로드캐스트 채널 생성
    const channel = new BroadcastChannel('payment_channel');
    channel.onmessage = (event) => {
      console.log('Payment message received:', event.data);
      
      // 결제 결과에 따른 처리
      if (event.data.status === 'success') {
        alert('결제가 완료되었습니다.');
      } else if (event.data.status === 'fail') {
        alert('결제에 실패했습니다.');
      }
      
      router.push('/chats/inquiry/list');
      channel.close();
    };

    // MTN 결제 URL 생성
    const paymentUrl = await getPayURL(vaInfo.price, timestamp);
    const encodedPaymentUrl = encodeURIComponent(paymentUrl);

    // 백엔드에 결제 요청 전송
    await basicPost('/mtn/payment/request', {
      paymentUrl: encodedPaymentUrl
    });

    // 결제 창 열기
    const paymentWindow = window.open(
      paymentUrl,
      'payment',
      'width=500,height=700'
    );

    if (!paymentWindow) {
      throw new Error('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
    }

  } catch (error) {
    console.error('결제 시도 중 오류:', error);
    alert('결제 시도 중 오류가 발생했습니다. 다시 시도해주세요.');
  } finally {
    setIsProcessing(false);
  }
};

interface PaymentButtonProps {
  vaInfo: VaCustomerDto;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  disabled?: boolean;
}

export const PaymentButton = ({ 
  vaInfo, 
  isProcessing, 
  setIsProcessing,
  disabled 
}: PaymentButtonProps) => {
  const router = useRouter();

  const handleClick = async () => {
    await handlePayment({
      vaInfo,
      setIsProcessing,
      router
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isProcessing}
      className="w-64 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
    >
      {isProcessing ? '처리중...' : '결제하기'}
    </button>
  );
}; 