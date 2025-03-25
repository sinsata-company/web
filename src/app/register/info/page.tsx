'use client'

import { BASE_URL, basicPost } from '@/api/base'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Input from '@/components/common/Input'
import LogoAppbar from '@/components/common/LogoAppbar'
import Modal from '@/components/common/Modal'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import EmailVerification from '@/app/register/components/EmailVerification'

export default function Page() {
  return (
    <Suspense>
      <Body />
    </Suspense>
  )
}

const Body = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [verificationError, setVerificationError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
      message: ''
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false)

  const query = useSearchParams()
  const key = query.get('key')
  const oauth = JSON.parse(key ?? '')
  const router = useRouter()

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationCode = async () => {
    setEmailError('');
    if (!email) {
      setEmailError('이메일을 입력해주세요');
      return;
    }
    
    try {
      const response = await basicPost('/users/send-verification', {
        email: email
      });
      
      if (response) {
        setIsVerifying(true);
        alert('인증번호가 발송되었습니다.');
      } else {
        setEmailError('인증번호 발송에 실패했습니다.');
      }
    } catch (error) {
      setEmailError('인증번호 발송 중 오류가 발생했습니다.');
    }
  };

  const verifyCode = async () => {
    setVerificationError('');
    if (!verificationCode) {
      setVerificationError('인증번호를 입력해주세요');
      return;
    }

    try {
      const response = await basicPost('/users/verify-code', {
        email: email,
        code: verificationCode
      });

      console.log('response', response)
      
      if (response?.verified) {
        setIsVerified(true);
        setIsVerifying(false);
        alert('인증이 완료되었습니다.');
      } else {
        setVerificationError('잘못된 인증번호입니다.');
      }
    } catch (error) {
      setVerificationError('인증 확인 중 오류가 발생했습니다.');
    }
  };

  const handleEmailVerification = () => {
    setIsEmailVerified(true)
    console.log('Email verification success')
  }

  return (
    <div className="h-screen ">
      <LogoAppbar />
      <div className="p-4 flex flex-col gap-4">
        <div className="text-2xl font-bold">상담 정보 입력</div>
        <div className="text-sm text-gray-500">
          상담을 위해 정보를 입력해주세요. <br />
          기재하신 이름, 전화번호 정보로 상담이 연결되오니 실제 상담에 사용하실
          정보를 입력 부탁드립니다.
          <br />
          입력하신 정보는 상담을 위한 목적으로만 사용되며, 일반 고객들에게
          노출되지 않습니다.
        </div>
        <Input
          name="이름"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
        />
        <Input
          name="전화번호"
          placeholder="전화번호를 입력해주세요 (- 없이 입력)"
          value={phone}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '')
            setPhone(value)
          }}
          error={phoneError}
        />
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="text-xl text-gray-700 mb-1">이메일</div>
            </div>
            <div className="w-24" />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
              />
            </div>
            <div className="w-24">
              <Button
                label={isVerified ? "인증완료" : "인증하기"}
                buttonType={isVerified ? BUTTON_TYPE.secondary : BUTTON_TYPE.primary}
                onClick={sendVerificationCode}
                disabled={isVerified}
              />
            </div>
          </div>
        </div>
        {isVerifying && (
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
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
                onClick={verifyCode}
              />
            </div>
          </div>
        )}
        <div className="h-12"></div>
        <EmailVerification onVerificationSuccess={handleEmailVerification} />
        <Button
          label="회원가입 완료하기"
          className={`w-full ${(!isEmailVerified || !isVerified) }`}
          buttonType={BUTTON_TYPE.primary}
          disabled={!isVerified}
          onClick={async () => {
            let hasError = false;
            setNameError('');
            setEmailError('');
            setPhoneError('');

            if (name === '') {
              setNameError('이름을 입력해주세요');
              hasError = true;
            }
            if (email === '') {
              setEmailError('이메일을 입력해주세요');
              hasError = true;
            }
            if (phone === '') {
              setPhoneError('전화번호를 입력해주세요');
              hasError = true;
            } else if (phone.length < 10 || phone.length > 11) {
              setPhoneError('올바른 전화번호를 입력해주세요');
              hasError = true;
            }
            if (hasError) return;

            try {
              const response = await axios.post(
                BASE_URL + '/users/join',
                {
                  ...oauth,
                  name: name,
                  email: email,
                  phoneNum: phone,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );

              const data = response.data;
              console.log(data)
              if (data?.userId) {
                const header = response.headers;
                const accessToken = header['sst-access-token']
                const accessTokenExpireAt = header['sst-access-token-expire-at']
                const refreshToken = header['sst-refresh-token']
                const refreshTokenExpireAt = header['sst-refresh-token-expire-at']

                localStorage.setItem('sst-access-token', accessToken)
                localStorage.setItem(
                  'sst-access-token-expire-at',
                  accessTokenExpireAt
                )
                localStorage.setItem('sst-refresh-token', refreshToken)
                localStorage.setItem(
                  'sst-refresh-token-expire-at',
                  refreshTokenExpireAt
                )
                router.push('/home');
              } else {
                setModalOpen(true);
                setModalData({
                  message: data?.errorMessage || ''
                });
              }
            } catch (error) {
              if (axios.isAxiosError(error)) {
                if (error.response?.status === 405) {
                  console.error('잘못된 HTTP 메서드입니다');
                  return;
                }
              }
              setModalOpen(true);
              setModalData({
                message: "서버 오류가 발생했습니다. 관리자에게 문의해주세요."
              });            
            }
          }}
        />
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}
        title="등록 오류"
        content={modalData?.message || '이미 기재하신 전화번호로 가입된 계정이 존재합니다. 다른 로그인 방법을 시도해주세요.'}
      >
        <Button
          label="확인"
          buttonType={BUTTON_TYPE.primary}
          onClick={() => {
            setModalOpen(false)
            // router.push('/register')
          }}
        />
      </Modal>
    </div>
  )
}
