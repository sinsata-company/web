'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function LogoAppbar() {
  const router = useRouter()
  const path = usePathname()
  return (
    <div className=" w-full h-14 px-5 justify-between items-center inline-flex">
      <Image
        className="cursor-pointer"
        src={'/images/sinsata_appbar_logo.svg'}
        width={120}
        height={28}
        alt="lgoo"
        onClick={() => {
          if (path.startsWith('/manage')) {
            router.push('/manage')
          }
        }}
      />
    </div>
  )
}
