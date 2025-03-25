'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Input from '@/components/common/Input'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import BackAppbar from '@/components/common/BackAppbar'
import ResultModal from '@/app/components/ResultModal'
import { basicPost } from '@/api/base'
import { UserDto } from '@/types/user'
export default function FindId() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [nameError, setNameError] = useState('')
  const [phoneNumError, setPhoneNumError] = useState('')
  const [verificationError, setVerificationError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [foundId, setFoundId] = useState('')
  const [showResultModal, setShowResultModal] = useState(false)

  const sendVerificationCode = async () => {
    if (!name || !phoneNum) {
      if (!name) setNameError('이름을 입력해주세요');
      if (!phoneNum) setPhoneNumError('전화번호를 입력해주세요');
      return;
    }
    
    // try {
    //   const response = await axios.post('/api/auth/send-verification', {
    //     phoneNum,
    //     name,
    //     type: 'ID'
    //   });
      
    //   if (response.data.success) {
    //     setIsVerifying(true);
    //     alert('인증번호가 발송되었습니다.');
    //   }
    // } catch (error) {
    //   setPhoneNumError('등록되지 않은 정보입니다.');
    // }
  };

  const verifyAndFind = async () => {
    if (!name.trim() || !phoneNum.trim()) {
      if (!name.trim()) setNameError('이름을 입력해주세요');
      if (!phoneNum.trim()) setPhoneNumError('전화번호를 입력해주세요');
      return;
    }

    try {
      const response = await basicPost<UserDto>('/users/find-email', {
        name: name.trim(),
        phoneNum: phoneNum.trim(),
      });

      if (response) {
        console.log(response)
        setFoundId(response.email);
        setShowResultModal(true);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        alert('등록된 사용자를 찾을 수 없습니다.');
        setNameError('');
        setPhoneNumError('');
        setName('');
        setPhoneNum('');
      } else {
        setVerificationError('인증 과정에서 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <div className="h-screen">
      <BackAppbar />
      <div className="p-4 flex flex-col gap-4">
        <div className="text-2xl font-bold">이메일 찾기</div>
        <div className="text-sm text-gray-500 mb-4">
          가입 시 등록한 이름과 전화번호로 이메일를 찾을 수 있습니다.
        </div>

        <Input
          name="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력해주세요"
          error={nameError}
        />

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="text-xl font-medium text-gray-700 mb-1">전화번호</div>
            </div>
            <div className="w-24" /> {/* 버튼 영역만큼 공간 확보 */}
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="전화번호를 입력해주세요"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                error={phoneNumError}
              />
            </div>
            <div className="w-24">
              <Button
                label="인증하기"
                buttonType={name.trim() && phoneNum.trim() ? BUTTON_TYPE.primary : BUTTON_TYPE.inactive}
                onClick={verifyAndFind}
                disabled={!name.trim() || !phoneNum.trim()}
              />
            </div>
          </div>
        </div>

        {isVerifying && (
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                name="인증번호"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="인증번호를 입력해주세요"
                error={verificationError}
              />
            </div>
            <div className="w-24">
              <Button
                label="확인"
                buttonType={BUTTON_TYPE.primary}
                onClick={verifyAndFind}
              />
            </div>
          </div>
        )}
      </div>

      <ResultModal
        isOpen={showResultModal}
        onClose={() => {
          setShowResultModal(false);
        }}
        title="이메일 찾기 결과"
        content={
          <div>
            <div className="text-lg font-medium mb-2">찾은 이메일</div>
            <div className="text-xl font-bold text-primary">{foundId}</div>
          </div>
        }
      />
    </div>
  )
} 