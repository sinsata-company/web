import { Button, BUTTON_TYPE } from '@/components/common/Button'
import GradientTitle from '@/components/common/GradientTitle'

const ReserveSummary = () => {
  return (
    <div className="px-5 inline-flex flex-col gap-5 w-full">
      <div className="w-full  justify-start items-start gap-2 inline-flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
          <GradientTitle title="000고객" />
          <div className="text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
            2025년 1월 10일 <br />
            오후 3시 - 오후 3시 30분
          </div>
        </div>
        <div className="p-2 bg-red-600/10 rounded-full justify-center items-center gap-1 flex">
          <div className="text-red-600 text-base font-bold font-['Pretendard Variable'] leading-tight">
            채팅 내역
          </div>
        </div>
      </div>
      <Button buttonType={BUTTON_TYPE.primary} label="채팅 내역 보기" />
    </div>
  )
}

export default ReserveSummary
