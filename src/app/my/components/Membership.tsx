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
    <div className="mb-4">
      {!level ? (
        <div className="px-4 my-4">
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
          <div className="p-4 flex  items-center w-full">
            <Image
              src={`/images/membership/${level}.png`}
              alt="level"
              width={48}
              height={48}
            />
            <div className="flex-col ml-3">
              <div className="text-zinc-900 text-lg font-bold font-['Pretendard Variable']">
                {nickname}
              </div>
              <div className="text-zinc-500 text-lg font-bold font-['Pretendard Variable']">
                {moment(createdAt).format('YYYY.MM.DD')}가입
              </div>
            </div>
            <div
              onClick={() => {
                router.push('/my/menus/profile')
              }}
              className="cursor-pointer ml-auto px-5 py-2 bg-gray-200 rounded-md justify-center items-center inline-flex"
            >
              <div className="text-center text-neutral-800 text-md font-semibold font-['Pretendard']">
                수정
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Membership
