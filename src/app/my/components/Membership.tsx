'use client'

import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { UserDto } from '@/types/user'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

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
}: {
  level: string
  nickname: string
}) => {
  const router = useRouter()
  return (
    <div className="p-4 flex justify-between items-center ">
      <div className="self-stretch flex items-center text-zinc-900 text-2xl font-bold font-['Pretendard Variable']">
        내 계정 정보
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center">
          {level ? (
            <Image
              src={`/images/membership/${level}.png`}
              alt="level"
              width={36}
              height={36}
            />
          ) : (
            <Button
              onClick={() => {
                router.push('/register')
              }}
              label="로그인하고 멤버십 확인하기"
              buttonType={BUTTON_TYPE.primary}
            />
          )}
          <span className="text-zinc-800 text-lg font-bold font-['Pretendard Variable']">
            {MembershipLevel[level as keyof typeof MembershipLevel]}
          </span>
        </div>
        <span className="text-zinc-900 text-lg font-bold font-['Pretendard Variable']">
          {nickname}
        </span>
      </div>
    </div>
  )
}

export default Membership
