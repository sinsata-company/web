'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

export default function AdvisorBTB() {
  return (
    <div className="bottom-0 left-0 fixed w-full h-16 px-5 py-2.5 bg-white shadow justify-between items-center inline-flex">
      <BTBItem name="홈" image="home" />
      <BTBItem name="상담 내역" image="reserves" />
      <BTBItem name="내 프로필 관리" image="my" />
    </div>
  )
}

const BTBItem = ({ name, image }: { name: string; image: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  console.log(pathname)
  const selected = pathname.replace('/manage/app/main/', '') == image
  console.log()
  return (
    <div
      onClick={() => {
        router.push('/manage/app/main/' + image)
      }}
      className="grow shrink basis-0 self-stretch flex-col justify-start items-center inline-flex"
    >
      <Image
        src={`/images/btb/${image}${selected ? '_selected' : ''}.svg`}
        height={36}
        width={36}
        alt="btb"
      />
      <div
        className={clsx(
          "self-stretch h-4 text-center  text-xs font-normal font-['Pretendard']",
          selected ? 'text-black' : 'text-zinc-400'
        )}
      >
        {name}
      </div>
    </div>
  )
}
