'use client'

import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { UserDto } from '@/types/user'
import moment from 'moment'
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
  createdAt,
}: {
  level: string
  nickname: string
  createdAt: string
}) => {
  const router = useRouter()
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
              onClick={() => {
                router.push('/my/menus/profile')
              }}
              className="cursor-pointer ml-auto px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 transition-colors"
            >
              수정
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Membership
