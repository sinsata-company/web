import Image from 'next/image'

export default function RserveHourSelector() {
  return (
    <div className="w-full px-5 justify-between items-center inline-flex">
      <div className="text-zinc-900 text-base font-bold font-['Pretendard Variable']">
        시간 예약하기
      </div>
      <div className="justify-end items-center gap-3 flex">
        <div className="w-8 h-8 px-2.5 rounded-full border border-zinc-100 justify-center items-center gap-2 flex">
          <Image
            src={'/images/ic_minus.svg'}
            width={10}
            height={2}
            alt="minus"
          />
        </div>
        <div className="text-zinc-900 text-base font-bold font-['Pretendard Variable']">
          30분
        </div>
        <div className="w-8 h-8 px-2.5 rounded-full border border-zinc-100 justify-center items-center gap-2 flex">
          <Image
            src={'/images/ic_plus.svg'}
            width={10}
            height={10}
            alt="plus"
          />
        </div>
      </div>
    </div>
  )
}
