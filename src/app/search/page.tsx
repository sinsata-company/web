import BTB from '@/components/common/Btb'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import MainAppbar from '@/components/common/MainAppbar'
import Image from 'next/image'

export default function SearchPage() {
  return (
    <div>
      <MainAppbar />
      <div className="w-full h-96 px-5 flex-col justify-start items-center gap-8 inline-flex">
        <div className="self-stretch h-28 flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-900 text-2xl font-bold font-['Pretendard Variable']">
            생년원일을 입력해주시면
            <br />더 정확한 상담이 가능합니다
          </div>
          <div className="p-2 bg-red-600/10 rounded-full justify-center items-center gap-1 inline-flex">
            <Image
              src={'/images/ic_mic.svg'}
              width={16}
              height={16}
              alt="mic"
            />
            <div className="text-red-600 text-base font-bold font-['Pretendard Variable'] leading-tight">
              음성 녹음해서 보내기
            </div>
          </div>
        </div>
        <div className="self-stretch h-56 flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch h-48 p-4 rounded-xl border border-zinc-400 justify-start items-start gap-3 inline-flex">
            <div className="grow shrink basis-0 self-stretch text-zinc-400 text-base font-normal font-['Pretendard'] leading-tight">
              새로운 상담 내용을 입력해주세요
            </div>
          </div>
          <div className="text-zinc-400 text-sm font-normal font-['Pretendard'] leading-tight">
            0/1000
          </div>
        </div>
        <Button buttonType={BUTTON_TYPE.primary} label="찾기" />
      </div>
      <BTB />
    </div>
  )
}
