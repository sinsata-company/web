export const config = {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    // 다른 환경 설정들도 여기에 추가 가능
}

// 타입 안정성을 위한 환경변수 검증
if (!config.API_BASE_URL) {
    throw new Error('Required environment variable "NEXT_PUBLIC_API_BASE_URL" is not set')
} 