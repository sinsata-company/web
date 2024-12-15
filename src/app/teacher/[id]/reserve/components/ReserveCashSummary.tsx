export default function ReserveCashSummary() {
  return (
    <div className="w-full px-5 flex-col justify-start items-start gap-3 inline-flex">
      <div className="text-zinc-900 text-base font-bold font-['Pretendard Variable']">
        요금 정보
      </div>
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="text-zinc-900 text-sm font-medium font-['Pretendard Variable']">
          총 합계
        </div>
        <div className="text-neutral-500 text-sm font-normal font-['Pretendard']">
          20 코인
        </div>
      </div>
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="text-zinc-900 text-sm font-medium font-['Pretendard Variable']">
          보유 코인
        </div>
        <div className="text-neutral-500 text-sm font-normal font-['Pretendard']">
          20 코인
        </div>
      </div>
    </div>
  )
}
