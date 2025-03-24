'use client'

import { useState } from 'react'
import axios from 'axios'
import Input from '@/components/common/Input'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { basicPost } from '@/api/base'

interface PasswordCheckModalProps {
  isOpen: boolean
  onClose: () => void
  onVerified: () => void
}

export default function PasswordCheckModal({ isOpen, onClose, onVerified }: PasswordCheckModalProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const verifyPassword = async () => {

    try {
      const response = await basicPost('/users/verify-password', {
        password: password
      });

      console.log('response', response)
      if (response) {
        sessionStorage.setItem('profile_verified', 'true');
        setPassword('');
        setError('');
        onVerified();
      } else {
        setError('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      setError('비밀번호 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <div className="text-xl font-bold mb-4">비밀번호 확인</div>
        <div className="text-sm text-gray-500 mb-4">
          개인정보 보호를 위해 비밀번호를 다시 한 번 입력해주세요.
        </div>

        <Input
          type="password"
          name="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
        />

        <div className="flex gap-2 mt-6">
          <Button
            label="취소"
            buttonType={BUTTON_TYPE.secondary}
            onClick={() => {
              setPassword('');
              setError('');
              onClose();
            }}
          />
          <Button
            label="확인"
            buttonType={BUTTON_TYPE.primary}
            onClick={verifyPassword}
          />
        </div>
      </div>
    </div>
  )
} 