'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const token = window.localStorage.getItem('sst-teacher-token')

    // 토큰이 없으면 /manage로 리디렉션
    if (!token || token.trim() === '') {
      router.replace('/manage')
    }
    if (typeof window !== 'undefined') {
    }
  }, [router])
  return <section>{children}</section>
}
