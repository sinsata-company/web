'use client'

import Image from 'next/image'
import { MembershipLevel } from '../../components/Membership'
import { useEffect, useState } from 'react'
import { UserDto } from '@/types/user'
import { getMyInfo } from '@/app/api/user'
import { formatNumberWithCommas } from '@/utils/numberFormatter'

const levels = [
  {
    level: MembershipLevel.LEVEL1,
    description: '신의불씨',
    price: 500000,
  },
  {
    level: MembershipLevel.LEVEL2,
    description: '사주의비밀',
    price: 1000000,
  },
  {
    level: MembershipLevel.LEVEL3,
    description: '타로의빛',
    price: 5000000,
  },
  {
    level: MembershipLevel.LEVEL4,
    description: '심리의정령',
    price: 15000000,
  },
  {
    level: MembershipLevel.LEVEL5,
    description: '신사타의전설',
    price: 30000000,
  },
]

export default function Page() {
  const [me, setMe] = useState<UserDto | null>(null)

  useEffect(() => {
    getMyInfo().then((res) => {
      setMe(res)
    })
  }, [])

  return (
    <div className="w-full flex flex-col gap-4">
      {levels.map((level, idx) => (
        <div
          key={level.level}
          className={`flex justify-between items-center border-2 ${
            `${idx + 1}` == me?.level.replace('LEVEL', '')
              ? 'border-indigo-400'
              : 'border-gray-200'
          } rounded-xl p-2 pl-4  gap-4`}
        >
          <div className="text-center text-3xl text-extraBold">
            {formatNumberWithCommas(level.price)}만원
          </div>
          <div className="flex flex-col items-center w-[90px]">
            <Image
              src={`/images/membership/LEVEL${idx + 1}.png`}
              alt="level"
              width={64}
              height={64}
            />
            <div className="text-center">{level.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
