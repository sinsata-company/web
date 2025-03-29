import { NextResponse } from 'next/server';
import { BASE_URL } from '@/api/base';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 백엔드 API로 요청을 프록시
    const response = await fetch(`${BASE_URL}/api/v1/mtn/payment-complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // 브로드캐스트 채널을 통해 결제 완료 메시지 전송
    const channel = new BroadcastChannel('payment_channel');
    channel.postMessage({
      type: 'PAYMENT_COMPLETE',
      payload: data
    });
    channel.close();

    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Payment completion error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET 메서드도 필요한 경우 추가
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  
  try {
    // 쿼리 파라미터 처리
    const queryParams = Object.fromEntries(searchParams.entries());
    
    const response = await fetch(`${BASE_URL}/api/v1/mtn/payment-complete?${new URLSearchParams(queryParams)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Payment completion error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 