'use client'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // 오류 로깅
    console.error('Global error occurred:', error)
    
    // // 3초 후에 페이지 리로드 시도
    // // const timer = setTimeout(() => {
    //   // window.location.href = '/home'
    // }, 3000)
    
    // return () => clearTimeout(timer)
  }, [error])

  return (
    <html>
      <body>
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          fontFamily: 'sans-serif' 
        }}>
          <h1>문제가 발생했습니다</h1>
          <p>잠시 후 홈페이지로 이동합니다.</p>
          <button
            onClick={reset}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  )
}
