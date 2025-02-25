import Image from 'next/image'

export default function LandingLogo() {
  return (
    <div className="grow p-2.5 justify-center items-center gap-2.5 flex">
      <div className="w-40 flex-col justify-start items-center gap-4 inline-flex">
        <Image
          src={'/logo-column.svg'}
          width={160}
          height={160}
          alt="logo-img"
        />
        {/* <Image src={'/text_logo.svg'} width={126} height={40} alt="logo-img" /> */}
      </div>
    </div>
  )
}
