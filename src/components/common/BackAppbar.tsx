'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function BackAppbar({ onClick }: { onClick?: () => void }) {
  const router = useRouter()
  return (
    <div className="w-96 h-14 px-5 justify-between items-center inline-flex">
      <div className="h-6 justify-start items-center gap-1 flex">
        <Image
          onClick={() => {
            if (onClick) {
              onClick && onClick()
            } else {
              router.back()
            }
          }}
          src={'/images/ic_back.svg'}
          width={8}
          height={16}
          alt="back"
        />
        <div className="w-6 h-6 justify-start items-center flex">
          <div className="w-6 h-6 justify-start items-center gap-2.5 flex" />
        </div>
      </div>
      <div className="justify-start items-center gap-4 flex">
        <div className="justify-end items-center gap-3 flex">
          <div className="w-6 h-6 p-2.5 justify-center items-center gap-2.5 flex" />
        </div>
        <div className="w-6 h-6 relative" />
      </div>
    </div>
  )
}
