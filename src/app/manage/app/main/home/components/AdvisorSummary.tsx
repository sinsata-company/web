const AdvisorSummary = () => {
  return (
    <div className="h-36 px-4 pt-6 pb-5 bg-rose-100 rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
      <div className="self-stretch text-zinc-900 text-2xl font-bold font-['Pretendard Variable']">
        이달의 상담 금액
      </div>
      <div className="self-stretch h-14 p-3 bg-white rounded-full justify-center items-center gap-2 inline-flex">
        <div className="w-8 h-8 p-2.5 bg-gradient-to-br from-yellow-400 via-red-600 to-blue-800 rounded-full flex-col justify-center items-center gap-2.5 inline-flex" />
        <div className="grow shrink basis-0 text-center text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
          20 캐시
        </div>
        <div className="w-8 h-8 p-2.5 opacity-0 bg-gradient-to-br from-yellow-400 via-red-600 to-blue-800 rounded-full" />
      </div>
    </div>
  )
}

export default AdvisorSummary
