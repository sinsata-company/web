'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSearch } from '@/contexts/SearchContext'

export default function MainAppbar() {
  const pathname = usePathname()
  const isHomePage = pathname === '/home'

  const searchContext = isHomePage ? useSearch() : null

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
      {/* <Link href={'/my/cash'}>
        <Image
          src={'/images/btb_search.svg'}
          width={24}
          height={24}
          alt="coupon"
        />
      </Link> */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="pl-3 pr-10 py-1.5 rounded-full bg-gray-100 text-sm focus:outline-none"
          onChange={(e) => {
            if (isHomePage && searchContext) {
              searchContext.setSearchTerm(e.target.value)
            }
          }}
        />
        <div className="absolute right-3">
          <Image
            src={'/images/btb_search.svg'}
            width={20}
            height={20}
            alt="search"
          />
        </div>
      </div>
    </div>
  )
}
