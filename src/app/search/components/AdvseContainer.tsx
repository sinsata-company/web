'use client'

import { useEffect, useState } from 'react'
import AdviseContent from './AdviseContent'
import SuggestLogin from '@/components/common/SuggestLogin'

const AdvseContainer = () => {
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('sst-access-token')
    if (!token) {
      setIsLogin(false)
    }
  }, [])
  return (
    <div className="w-full py-5 px-5 flex-col justify-start items-center gap-8 inline-flex">
      {!isLogin ? (
        <SuggestLogin label="선생님 추천을 받기 " />
      ) : (
        <>
          <div className="self-stretch  flex-col justify-start items-start gap-4 flex">
            <div className="self-stretch text-zinc-900 text-2xl font-bold font-['Pretendard Variable']">
              생년원일을 입력해주시면
              <br />더 정확한 상담이 가능합니다
            </div>
          </div>
          <AdviseContent />
        </>
      )}
    </div>
  )
}

export default AdvseContainer
