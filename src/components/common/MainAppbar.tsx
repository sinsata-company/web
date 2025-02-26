'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MainAppbar() {
  const path = usePathname()
  return (
    <div
      className={clsx(
        'w-full pt-3 h-14 px-5 justify-between items-center inline-flex',

        path === '/chats' && 'bg-amber-50'
      )}
    >
      <Link href="/home">
        <Image
          src={'/images/sinsata_appbar_logo.svg'}
          width={120}
          height={28}
          alt="lgoo"
        />
      </Link>
      <Link href={'/my/cash'}>
        <Image
          src={'/images/ic_coupon.svg'}
          width={24}
          height={24}
          alt="coupon"
        />
      </Link>
    </div>
  )
}
