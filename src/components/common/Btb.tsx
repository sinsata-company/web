'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

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

  return (
    <div
      onClick={() => {
        router.push('/' + image)
      }}
      className="cursor-pointer grow flex-col justify-start items-center  inline-flex max-w-[550px] mx-auto"
    >
      <Image
        src={`/images/btb/${image}${selected ? '_selected' : ''}.svg`}
        height={36}
        width={36}
        alt="btb"
      />
      <div
        className={clsx(
          "self-stretch h-4 text-center text-xs font-normal font-['Pretendard']",
          selected ? 'text-black' : 'text-zinc-400'
        )}
      >
        {name}
      </div>
    </div>
  )
}
