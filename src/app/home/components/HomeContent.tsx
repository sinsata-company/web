'use client'

import { useEffect } from 'react'
import { createTag } from '../utils/createTag'

// 기존 home/page.tsx의 내용을 여기로 이동
const HomeContent = () => {
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      createTag()
    }
  }, [])

  return (
    <div>
      {/* 기존 홈페이지 컴포넌트들 */}
    </div>
  )
}

export default HomeContent 