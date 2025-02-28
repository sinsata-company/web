'use client'

import Image from 'next/image'
import CategoryContainer from './CategoryContainer'
import StaticItem from './StaticItem'
import { useRouter } from 'next/navigation'
import { getSummary, summary } from '@/app/api/teacher'
import { useEffect, useState } from 'react'

const BannersAndStatics = () => {
  const router = useRouter()
  const [info, setSummary] = useState<summary>({
    teachers: 0,
    reservations: 0,
  })
  useEffect(() => {
    getSummary().then((res) => {
      setSummary(res)
    })
  }, [])
  return (
    <div className="relative h-[200px]">
      <div className="absolute top-[-50px] left-0 w-full h-80 ">
        <div
          style={{
            width: 'calc(100% - 2rem)',
          }}
          className="mx-4  py-4 bg-white rounded-2xl flex-col justify-start items-center gap-4 inline-flex"
        >
          <CategoryContainer
            onClick={(e: string) => {
              router.push('/home/' + e)
            }}
          />
          <div className="self-stretch h-px bg-gray-200"></div>
          <div className="justify-start items-center gap-6 inline-flex">
            <Image
              onClick={() => {
                router.push('/chats/group/sinjeom')
              }}
              src={`/images/group-chat-button.svg`}
              alt="group-chat"
              width={40}
              height={40}
              className="h-6 w-full cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-6 flex px-4 items-stretch justify-between gap-4">
          <StaticItem label="누적 상담 건수" data={`${info.reservations}건`} />
          <StaticItem label="현재 접속 상담사" data={`${info.teachers}명`} />
        </div>
      </div>
    </div>
  )
}

export default BannersAndStatics
