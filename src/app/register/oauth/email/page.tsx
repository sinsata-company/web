'use client'

import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Input from '@/components/common/Input'
import LogoAppbar from '@/components/common/LogoAppbar'
import { useEffect, useState } from 'react'

export default function Page() {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [name, setName] = useState('')

  const validate = () => {
    if (password !== passwordConfirm) {
      setPasswordError('비밀번호가 일치하지 않습니다.')
      return false
    }
    setPasswordError('')
    return true
  }

  useEffect(() => {
    validate()
  }, [password, passwordConfirm])

  return (
    <div>
      <LogoAppbar />
      <div className="inline-flex flex-col gap-8 w-full p-5">
        <Input
          name="아이디"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="아이디를 입력해주세요"
        />
        <Input
          name="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          placeholder="비밀번호를 입력해주세요"
          type="password"
        />
        <Input
          name="비밀번호 확인"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value)
          }}
          error={passwordError}
          placeholder="비밀번호를 다시 입력해주세요"
          type="password"
        />
        <Button
          buttonType={BUTTON_TYPE.primary}
          label="회원가입"
          onClick={() => {
            if (validate() && name) {
              alert('회원가입 성공')
            }
          }}
        />
      </div>
    </div>
  )
}
