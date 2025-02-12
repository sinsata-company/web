'use client'

import { useRouter } from 'next/navigation'
import { Button, BUTTON_TYPE } from './Button'

const SuggestLogin = ({ label }: { label: string }) => {
  const router = useRouter()
  return (
    <div className="text-center mt-5 w-full  flex flex-col justify-center items-center gap-4">
      <div className="self-stretch mb-4 flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
          {label} 위해 로그인이 필요합니다.
          <br />
          아래 버튼을 눌러 로그인해주세요.
        </div>
        <Button
          buttonType={BUTTON_TYPE.primary}
          label="로그인하러 가기"
          onClick={() => {
            router.push('/register')
          }}
        />
      </div>
    </div>
  )
}

export default SuggestLogin
