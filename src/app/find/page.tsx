'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Input from '@/components/common/Input'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import LogoAppbar from '@/components/common/LogoAppbar'

type FindType = 'ID' | 'PASSWORD'

export default function FindAccount() {
  const router = useRouter()
  const [findType, setFindType] = useState<FindType>('ID')
  const [name, setName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [nameError, setNameError] = useState('')
  const [phoneNumError, setPhoneNumError] = useState('')
  const [verificationError, setVerificationError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [foundId, setFoundId] = useState<string>('')
  const [tempPassword, setTempPassword] = useState<string>('')

  const sendVerificationCode = async () => {
    if (!name || !phoneNum) {
      if (!name) setNameError('이름을 입력해주세요');
      if (!phoneNum) setPhoneNumError('전화번호를 입력해주세요');
      return;
    }
    
    try {
      const response = await axios.post('/api/auth/send-verification', {
        phoneNum,
        name,
        type: findType
      });
      
      if (response.data.success) {
        setIsVerifying(true);
        alert('인증번호가 발송되었습니다.');
      } else {
        setPhoneNumError('인증번호 발송에 실패했습니다.');
      }
    } catch (error) {
      setPhoneNumError('등록되지 않은 정보입니다.');
    }
  };

  const verifyAndFind = async () => {
    if (!verificationCode) {
      setVerificationError('인증번호를 입력해주세요');
      return;
    }

    try {
      const response = await axios.post('/api/auth/find-account', {
        name,
        phoneNum,
        verificationCode,
        type: findType
      });

      if (response.data.success) {
        if (findType === 'ID') {
          setFoundId(response.data.email);
        } else {
          setTempPassword(response.data.tempPassword);
        }
      } else {
        setVerificationError('잘못된 인증번호입니다.');
      }
    } catch (error) {
      setVerificationError('인증에 실패했습니다.');
    }
  };

  return (
    <div className="h-screen">
      <LogoAppbar />
      <div className="p-4 flex flex-col gap-4">
        <div className="text-2xl font-bold">계정 찾기</div>
        
        <div className="flex gap-2 mb-4">
          <Button
            label="이메일 찾기"
            buttonType={findType === 'ID' ? BUTTON_TYPE.primary : BUTTON_TYPE.secondary}
            onClick={() => setFindType('ID')}
          />
          <Button
            label="비밀번호 찾기"
            buttonType={findType === 'PASSWORD' ? BUTTON_TYPE.primary : BUTTON_TYPE.secondary}
            onClick={() => setFindType('PASSWORD')}
          />
        </div>

        <Input
          name="이름"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
        />

        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              name="전화번호"
              placeholder="전화번호를 입력해주세요"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
              error={phoneNumError}
            />
          </div>
          <div className="w-24">
            <Button
              label="인증하기"
              buttonType={BUTTON_TYPE.primary}
              onClick={sendVerificationCode}
            />
          </div>
        </div>

        {isVerifying && (
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                name="인증번호"
                placeholder="인증번호를 입력해주세요"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
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
    </div>
  )
} 