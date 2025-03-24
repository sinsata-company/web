'use client'

import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { UserDto } from '@/types/user'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Modal from '@/components/common/Modal'
import { verifyPassword } from '@/app/api/user'

export enum MembershipLevel {
  LEVEL1 = '신의불씨',
  LEVEL2 = '사주의비밀',
  LEVEL3 = '타로의빛',
  LEVEL4 = '심리의정령',
  LEVEL5 = '신사타의전설',
}

const Membership = ({
  level,
  nickname,
  createdAt,
}: {
  level: string
  nickname: string
  createdAt: string
}) => {
  const router = useRouter()
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handlePasswordVerification = async () => {
    try {
      await verifyPassword(password)
      setShowPasswordModal(false)
      setPassword('')
      router.push('/my/menus/profile')
    } catch (error) {
      setPasswordError('비밀번호가 일치하지 않습니다.')
    }
  }

  return (
    <div className="mb-2">
      {!level ? (
        <div className="px-3 my-3">
          <Button
            onClick={() => {
              router.push('/register')
            }}
            label="로그인 하러 가기"
            buttonType={BUTTON_TYPE.primary}
          />
        </div>
      ) : (
        <>
          <div className="p-3 flex items-center w-full bg-white shadow-sm rounded-lg">
            <Image
              src={`/images/membership/${level}.png`}
              alt="level"
              width={36}
              height={36}
              className="object-contain"
            />
            <div className="flex-col ml-2.5">
              <div className="text-zinc-900 text-base font-medium">{nickname}</div>
              <div className="text-zinc-500 text-sm">
                {moment(createdAt).format('YYYY.MM.DD')} 가입
              </div>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="cursor-pointer ml-auto px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 transition-colors"
            >
              수정
            </button>
          </div>

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
                />
                <Button
                  buttonType={BUTTON_TYPE.primary}
                  label="확인"
                  onClick={handlePasswordVerification}
                />
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  )
}

export default Membership

