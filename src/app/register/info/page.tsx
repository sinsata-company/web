'use client'

import { BASE_URL } from '@/api/base'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Input from '@/components/common/Input'
import LogoAppbar from '@/components/common/LogoAppbar'
import Modal from '@/components/common/Modal'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

export default function Page() {
  return (
    <Suspense>
      <Body />
    </Suspense>
  )
}

const Body = () => {
  const [name, setName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [nameError, setNameError] = useState('')
  const [phoneNumError, setPhoneNumError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const query = useSearchParams()
  const key = query.get('key')
  const oauth = JSON.parse(key ?? '')
  const router = useRouter()

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
          placeholder="전화번호를 입력해주세요"
          value={phoneNum}
          onChange={(e) => {
            setPhoneNum(e.target.value)
          }}
          error={phoneNumError}
        />
        <div className="h-12"></div>
        <Button
          label="회원가입 완료하기"
          buttonType={BUTTON_TYPE.primary}
          onClick={async () => {
            if (name === '') {
              setNameError('이름을 입력해주세요')
            }
            if (phoneNum === '') {
              setPhoneNumError('전화번호를 입력해주세요')
            }
            setNameError('')
            setPhoneNumError('')

            const response = await axios.post(
              BASE_URL + '/users/join',
              {
                ...oauth,
                name: name,
                phoneNum: phoneNum,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            const data = response.data

            if (data.mtnId) {
              const header = response.headers

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
              router.push('/home')
            } else {
              setModalOpen(true)
            }
          }}
        />
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
        }}
        title="전화번호 중복"
        content="이미 기재하신 전화번호로 가입된 계정이 존재합니다. 다른 로그인 방법을 시도해주세요."
      >
        <Button
          label="확인"
          buttonType={BUTTON_TYPE.primary}
          onClick={() => {
            setModalOpen(false)
            router.push('/register')
          }}
        />
      </Modal>
    </div>
  )
}
