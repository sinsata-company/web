'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    router.replace('/home') // 에러 발생 시 /register로 이동
  }, [])

  return null // 아무것도 렌더링하지 않음
}
