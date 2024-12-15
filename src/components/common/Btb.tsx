'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import path from 'path'

export default function BTB() {
  return (
    <div className="bottom-0 left-0 fixed w-full h-16 px-5 py-2.5 bg-white shadow justify-between items-center inline-flex">
      <BTBItem name="홈" image="home" />
      <BTBItem name="검색" image="search" />
      <BTBItem name="채팅" image="chats" />
      <BTBItem name="My" image="my" />
    </div>
  )
}

const BTBItem = ({ name, image }: { name: string; image: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const selected = pathname.replace('/', '') == image
  console.log()
  return (
    <div
      onClick={() => {
        router.push('/' + image)
      }}
      className="grow shrink basis-0 self-stretch flex-col justify-start items-center gap-1.5 inline-flex"
    >
      <Image
        src={`/images/btb_${image}${selected ? '_selected' : ''}.svg`}
        height={24}
        width={24}
        alt="btb"
      />
      <div
        className={clsx(
          "self-stretch h-4 text-center text-zinc-400 text-xs font-normal font-['Pretendard']",
          selected ? 'text-gradient' : ''
        )}
      >
        {name}
      </div>
    </div>
  )
}
