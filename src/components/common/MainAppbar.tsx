import Image from 'next/image'
import Link from 'next/link'

export default function MainAppbar() {
  return (
    <div className="w-full h-14 px-5 justify-between items-center inline-flex">
      <Image
        src={'/images/sinsata_appbar_logo.svg'}
        width={120}
        height={28}
        alt="lgoo"
      />
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
