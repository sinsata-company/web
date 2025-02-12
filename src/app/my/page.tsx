'use client'

import BTB from '@/components/common/Btb'
import MainAppbar from '@/components/common/MainAppbar'
import CashSummary from './components/CashSummary'
import MyTabContainer from './components/MyTabContainer'
import { useEffect, useState } from 'react'
import SuggestLogin from '@/components/common/SuggestLogin'

export default function MyPage() {
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('sst-access-token')
    if (!token) {
      setIsLogin(false)
    }
  }, [])

  return (
    <div>
      <MainAppbar />
      {!isLogin ? (
        <div className="px-4">
          <SuggestLogin label="내 정보를 보기" />
        </div>
      ) : (
        <>
          <CashSummary />
          <div className="h-4"></div>
          <MyTabContainer />
        </>
      )}

      <BTB />
    </div>
  )
}
