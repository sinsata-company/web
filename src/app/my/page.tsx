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
import TextSize from './components/TextSize'
import { useAppContext } from '@/context/AppContext'

export default function MyPage() {
  const [isLogin, setIsLogin] = useState(true)

  const [me, setMe] = useState<UserDto | null>(null)

  const context = useAppContext()
  const { fontFamily, fontSize } = context || {}

  useEffect(() => {
    const token = (window.localStorage.getItem('sst-teacher-token') || window.localStorage.getItem('sst-access-token'))
    if (!token) {
      setIsLogin(false)
    }
    getMyInfo().then((res) => {
      setMe(res)
    })
  }, [])

  const router = useRouter()

  return (
    <div className={`h-screen bg-gray-50`}>
      <MainAppbar />
      {!isLogin ? (
        <div className="px-3">
          <SuggestLogin label="내 정보를 보기" />
        </div>
      ) : (
        <div className={`max-w-screen-md mx-auto ${fontFamily} [&_*]:${fontSize}`}>
          <Membership
            level={me?.level ?? ''}
            nickname={me?.nickname ?? ''}
            createdAt={me?.createdAt ?? ''}
          />
          <div className="px-3">
            <CashSummary />
            <div className="h-3"></div>
            <div className="bg-white rounded-lg shadow-sm">
              <MenuOptions />
              <TextSize />
              <ApplyCsl />
            </div>
            {isLogin && (
              <div className="mt-4">
                <div className="flex justify-end">
                  <button
                    className="text-gray-500 text-xs py-1.5 px-3 hover:text-gray-700"
                    onClick={() => {
                      localStorage.clear()
                      router.push('/register')
                    }}
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="h-14"></div>
      <BTB />
    </div>
  )
}
