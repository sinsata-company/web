export default function AdvisorSort() {
  return (
    <div className="w-full h-12 p-1.5 bg-zinc-100 rounded-xl justify-center items-center gap-1 inline-flex">
      <div className="grow shrink basis-0 h-9 p-2 bg-white rounded-lg shadow justify-center items-center gap-2.5 flex">
        <div className="text-zinc-900 text-base font-bold font-['Pretendard Variable']">
          신규순
        </div>
      </div>
      <div className="grow shrink basis-0 h-9 p-2 rounded-lg justify-center items-center gap-2.5 flex">
        <div className="text-zinc-400 text-base font-bold font-['Pretendard Variable']">
          인기순
        </div>
      </div>
      <div className="grow shrink basis-0 h-9 p-2 rounded-lg justify-center items-center gap-2.5 flex">
        <div className="text-zinc-400 text-base font-bold font-['Pretendard Variable']">
          조회순
        </div>
      </div>
      <div className="grow shrink basis-0 h-9 p-2 rounded-lg justify-center items-center gap-2.5 flex">
        <div className="text-zinc-400 text-base font-bold font-['Pretendard Variable']">
          최근 조회
        </div>
      </div>
    </div>
  )
}
