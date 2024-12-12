export default function AdvisorList() {
  return (
    <div>
      <AdvisorItem />
    </div>
  )
}

function AdvisorItem() {
  return (
    <div className="w-full h-28 p-4 bg-neutral-50 rounded-2xl border border-zinc-100 justify-start items-center gap-3 inline-flex">
      <div className="w-20 h-20 bg-zinc-100 rounded-xl" />
      <div className="flex-col justify-center items-start gap-2 inline-flex">
        <div className="w-56 text-zinc-900 text-base font-bold font-['Pretendard Variable']">
          신사타 전문 선생님
          <br />
          이것은 타이틀입니다
        </div>
        <div className="justify-start items-center gap-1 inline-flex">
          <div className="w-4 h-4 relative" />
          <div className="text-yellow-400 text-sm font-bold font-['Pretendard Variable'] leading-tight">
            이것은 위치입니다
          </div>
        </div>
      </div>
    </div>
  )
}
