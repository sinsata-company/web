import Image from 'next/image'
import Link from 'next/link'

export function UsageFooter() {
  return (
    <div className="px-4 py-5 w-full bg-neutral-50 flex-col justify-start items-start gap-1.5 inline-flex">
      <div className="h-1"></div>
      <div className="justify-start items-center gap-2 inline-flex">
        <div className="text-zinc-500 text-xs font-medium font-['Spoqa Han Sans Neo'] leading-none">
          {/* <div className="">이용약관</div> | */}
          <Link href={'/etc'} className="">
            개인정보처리방침
          </Link>{' '}
          {/* |<div className="">위치정보이용제공동의</div> */}
        </div>
      </div>
      <div className="h-1"></div>

      <div className="inline-flex flex-col gap-2">
        <div className="flex sinline-flex">
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="text-zinc-500 text-xs font-normal font-['Spoqa Han Sans Neo'] leading-none">
              상호명 : 신사타컴퍼니
            </div>
          </div>
          <div className="w-5"></div>
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="text-zinc-500 text-xs font-normal font-['Spoqa Han Sans Neo'] leading-none">
              대표자 : 김가경
            </div>
          </div>
        </div>
        <div className="justify-start items-center gap-2 inline-flex">
          <div className="text-zinc-500 text-xs font-normal font-['Spoqa Han Sans Neo'] leading-none">
            사업자등록번호 : 781-37-01346
          </div>
        </div>

        <div className="justify-start items-center gap-2 inline-flex">
          <div className="text-zinc-500 text-xs font-normal font-['Spoqa Han Sans Neo'] leading-none">
            주소 : 경상남도 창원시 의창구 동읍 용정길 46번길 32
          </div>
        </div>
        <div className="justify-start items-center gap-2 inline-flex">
          <div className="text-zinc-500 text-xs font-normal font-['Spoqa Han Sans Neo'] leading-none">
            고객문의 : shinsata1650@gmail.com
          </div>
        </div>
      </div>
      <div className=" h-4" />
    </div>
  )
}
