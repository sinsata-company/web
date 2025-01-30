import Image from 'next/image'
import Link from 'next/link'

export default function LogoAppbar() {
  return (
    <div className="w-full h-14 px-5 justify-between items-center inline-flex">
      <Image
        src={'/images/sinsata_appbar_logo.svg'}
        width={120}
        height={28}
        alt="lgoo"
      />
    </div>
  )
}
