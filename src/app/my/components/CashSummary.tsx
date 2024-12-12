export default function CashSummary() {
  return (
    <div className="w-full h-44 px-5 flex-col justify-center items-center gap-2.5 inline-flex">
      <div className="self-stretch h-44 px-4 pt-6 pb-5 bg-red-600/10 rounded-2xl flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch h-14 p-3 bg-white rounded-full justify-center items-center gap-2 inline-flex">
          <div className="w-8 h-8 p-2.5 bg-gradient-to-br from-yellow-400 via-red-600 to-blue-800 rounded-full flex-col justify-center items-center gap-2.5 inline-flex" />
          <div className="grow shrink basis-0 text-center text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
            20 캐시
          </div>
          <div className="w-8 h-8 p-2.5 opacity-0 bg-gradient-to-br from-yellow-400 via-red-600 to-blue-800 rounded-full" />
        </div>
        <div className="self-stretch h-14 px-3 bg-gradient-to-br from-yellow-400 via-red-600 to-blue-800 rounded-xl justify-center items-center gap-1 inline-flex">
          <div className="text-center text-white text-base font-bold font-['Pretendard Variable']">
            충전하기
          </div>
        </div>
      </div>
    </div>
  )
}
