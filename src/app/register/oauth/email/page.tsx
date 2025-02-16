'use client'

import { canUseId, joinByEmail, loginByEmail } from '@/app/api/user'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Input from '@/components/common/Input'
import LogoAppbar from '@/components/common/LogoAppbar'
import { useRouter } from 'next/navigation'
import { join } from 'path'
import { useEffect, useState } from 'react'

export default function Page() {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState('')
  const [nameError, setNameError] = useState('')
  const [name, setName] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const validate = () => {
    if (password !== passwordConfirm) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.')
      return false
    }
    setPasswordConfirmError('')
    return true
  }

  useEffect(() => {
    validate()
  }, [password, passwordConfirm])

  const nav = useRouter()

  const onSubmit = async () => {
    const canUse = await canUseId(name)
    if (isLogin) {
      if (!canUse) {
        const result = await loginByEmail(name, password, 'EMAIL')
        if (!result) {
          setPasswordError('비밀번호가 일치하지 않습니다.')
          return
        }
      } else {
        setNameError('존재하지 않는 아이디입니다.')
        return
      }
    } else {
      if (!canUse) {
        setNameError('이미 사용중인 아이디입니다.')
        return
      }
      if (validate() && name && canUse && password) {
        await joinByEmail(name, password, 'EMAIL')
      }
    }
    nav.push('/home')
  }
  return (
    <div>
      <LogoAppbar />
      <div className="inline-flex flex-col gap-8 w-full p-5">
        <Input
          name="아이디"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="아이디를 입력해주세요"
          error={nameError}
        />
        <Input
          name="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          placeholder="비밀번호를 입력해주세요"
          error={passwordError}
          type="password"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit()
            }
          }}
        />
        {!isLogin && (
          <Input
            name="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value)
            }}
            error={passwordConfirmError}
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
          />
        )}

        <Button
          buttonType={BUTTON_TYPE.primary}
          label={isLogin ? '로그인' : '회원가입'}
          onClick={onSubmit}
        />
        <div
          className="text-grey-600 text-sm cursor-pointer underline text-center"
          onClick={() => {
            setIsLogin(!isLogin)
          }}
        >
          {isLogin ? '회원가입 ' : '로그인'} 하러가기
        </div>
      </div>
    </div>
  )
}
