export default function ReserveCashSummary({
  selectedHour,
  myCash,
  selectedTime,
}: {
  selectedHour: number
  myCash: number
  selectedTime: string
}) {
  return (
    <div className="w-full px-5 flex-col justify-start items-start gap-3 inline-flex">
      <div className="text-zinc-900 text-base font-bold ">요금 정보</div>
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="text-zinc-900 text-sm font-medium ">총 합계</div>
        <div className="text-neutral-500 text-sm font-normal ">
          {selectedHour == 15 ? 25000 : selectedHour == 30 ? 40000 : 90000} 코인
        </div>
      </div>
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="text-zinc-900 text-sm font-medium ">보유 코인</div>
        <div className="text-neutral-500 text-sm font-normal ">
          {myCash} 코인
        </div>
      </div>
    </div>
  )
}
