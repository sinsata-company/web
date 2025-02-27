'use client'

import BTB from '@/components/common/Btb'
import MainAppbar from '@/components/common/MainAppbar'
import CashSummary from './components/CashSummary'
import MyTabContainer from './components/MyTabContainer'
import { useEffect, useState } from 'react'
import SuggestLogin from '@/components/common/SuggestLogin'
import Modal from '@/components/common/Modal'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { getMyInfo, withdraw } from '../api/user'
import { useRouter } from 'next/navigation'
import Membership from './components/Membership'
import { UserDto } from '@/types/user'
import MenuOptions from './components/MenuOptions'
import ApplyCsl from './components/ApplyCsl'

export default function MyPage() {
  const [isLogin, setIsLogin] = useState(true)

  const [me, setMe] = useState<UserDto | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('sst-access-token')
    if (!token) {
      setIsLogin(false)
    }
    getMyInfo().then((res) => {
      setMe(res)
    })
  }, [])

  const router = useRouter()

  return (
    <div className="h-screen">
      <MainAppbar />
      {!isLogin ? (
        <div className="px-4">
          <SuggestLogin label="내 정보를 보기" />
        </div>
      ) : (
        <>
          <Membership
            level={me?.level ?? ''}
            nickname={me?.nickname ?? ''}
            createdAt={me?.createdAt ?? ''}
          />
          <CashSummary />
          <div className="h-4"></div>
          <MenuOptions />
          <ApplyCsl />
          {/* <MyTabContainer /> */}
          {isLogin && (
            <div>
              <div className="flex justify-end px-4">
                <button
                  className=" text-gray-400 text-sm py-2 px-4 rounded"
                  onClick={() => {
                    // Handle 회원탈퇴 logic here
                    localStorage.clear()
                    router.push('/register')
                  }}
                >
                  로그아웃
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <div className="h-16"></div>

      <BTB />
    </div>
  )
}
