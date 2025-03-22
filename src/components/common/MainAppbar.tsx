'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MainAppbar() {
  const pathname = usePathname()
  const isHomePage = pathname === '/home'


  return (
    <div
      className={clsx(
        'w-full pt-3  px-5 justify-between items-center flex',

        pathname === '/chats' && 'bg-amber-50'
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
   
      <button className="relative flex items-center">
        <Link href="/search/detail">
          <Image
            src={'/images/btb_search.svg'}
            width={24}
            height={24}
            alt="search"
          />
        </Link>
      </button>
    </div>
  )
}
