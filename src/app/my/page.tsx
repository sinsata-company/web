'use client'

import BTB from '@/components/common/Btb'
import MainAppbar from '@/components/common/MainAppbar'
import CashSummary from './components/CashSummary'
import MyTabContainer from './components/MyTabContainer'
import { useEffect, useState } from 'react'
import SuggestLogin from '@/components/common/SuggestLogin'
import Modal from '@/components/common/Modal'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { getMyInfo, withdraw, verifyPassword } from '../api/user'
import { useRouter, usePathname } from 'next/navigation'
import Membership from './components/Membership'
import { UserDto } from '@/types/user'
import MenuOptions from './components/MenuOptions'
import ApplyCsl from './components/ApplyCsl'
import TextSize from './components/TextSize'
import { useAppContext } from '@/context/AppContext'

export default function MyPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [me, setMe] = useState<UserDto | null>(null)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [editTarget, setEditTarget] = useState('')

  const pathname = usePathname()

  const context = useAppContext()
  const { fontFamily, fontSize } = context || {}

  const shouldApplyFontStyles = pathname === '/my'

  useEffect(() => {
    if (!shouldApplyFontStyles) {
      localStorage.removeItem('fontFamily')
      localStorage.removeItem('fontSize')
    }
  }, [shouldApplyFontStyles])

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

  const handlePasswordVerification = async () => {
    try {
      await verifyPassword(password)
      setShowPasswordModal(false)
      setPassword('')
      // 비밀번호 인증 성공 후 수정 화면으로 이동
      router.push('/register')
    } catch (error) {
      setPasswordError('비밀번호가 일치하지 않습니다.')
    }
  }

  return (
    <div className={`h-screen bg-gray-50`}>
      <MainAppbar />
      {!isLogin ? (
        <div className="px-3">
          <SuggestLogin label="내 정보를 보기" />
        </div>
      ) : (
        <div className={`max-w-screen-md mx-auto ${shouldApplyFontStyles ? fontFamily : ''}`}>
          <div className={shouldApplyFontStyles ? fontSize : ''}>
            <Membership
              level={me?.level ?? ''}
              nickname={me?.nickname ?? ''}
              createdAt={me?.createdAt ?? ''}
            />
            <div className="px-3">
              <CashSummary />
              <div className="h-3"></div>
              <div className="bg-white rounded-lg shadow-sm">
                <MenuOptions onEditClick={() => {
                  setShowPasswordModal(true)
                }} />
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
                        router.push('/')
                      }}
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="h-14"></div>
      <BTB />

      <Modal
        title="비밀번호 확인"
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false)
          setPassword('')
          setPasswordError('')
        }}
      >
        <div className="p-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full px-3 py-2 border rounded-lg mb-2"
          />
          {passwordError && (
            <p className="text-red-500 text-sm mb-2">{passwordError}</p>
          )}
          <div className="flex justify-end gap-2">
            <Button
              buttonType={BUTTON_TYPE.secondary}
              label="취소"
              onClick={() => {
                setShowPasswordModal(false)
                setPassword('')
                setPasswordError('')
              }}
            >
              취소
            </Button>
            <Button
              buttonType={BUTTON_TYPE.primary}
              label="확인"
              onClick={handlePasswordVerification}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
