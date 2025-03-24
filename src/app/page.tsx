'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
    
    useEffect(() => {
        router.replace('/home')
    }, [router])
    
    return <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">로딩 중...</div>
    </div>
}
