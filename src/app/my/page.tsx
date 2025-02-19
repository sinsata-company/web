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

export default function MyPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
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
    <div>
      <MainAppbar />
      {!isLogin ? (
        <div className="px-4">
          <SuggestLogin label="내 정보를 보기" />
        </div>
      ) : (
        <>
          <Membership level={me?.level ?? ''} nickname={me?.nickname ?? ''} />
          <CashSummary />
          <div className="h-4"></div>
          <MyTabContainer />
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
              <div className="flex justify-end px-4">
                <button
                  className=" text-gray-400 text-sm py-2 px-4 rounded"
                  onClick={() => {
                    // Handle 회원탈퇴 logic here
                    setIsModalOpen(true)
                  }}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          )}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="회원탈퇴"
            content="회원탈퇴를 하시겠습니까? 한 번 탈퇴한 계정은 영구 삭제되며, 다시 복구되지 않습니다."
          >
            <div className="flex justify-end gap-4">
              <Button
                label="취소"
                onClick={() => {
                  // Handle 회원탈퇴 logic here
                  setIsModalOpen(false)
                }}
                buttonType={BUTTON_TYPE.primary}
              />
              <Button
                label="회원탈퇴"
                onClick={async () => {
                  // Handle 회원탈퇴 logic here
                  await withdraw()
                  setIsModalOpen(false)
                  localStorage.clear()
                  router.push('/register')
                }}
                buttonType={BUTTON_TYPE.secondary}
              />
            </div>
          </Modal>
        </>
      )}

      <BTB />
    </div>
  )
}
