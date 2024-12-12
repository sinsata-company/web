export default function MyAdvisor() {
  return (
    <div>
      <div className=" w-full h-7 flex-col justify-start items-start gap-2.5 inline-flex">
        <div className="self-stretch justify-center items-start inline-flex">
          <div className="grow shrink basis-0 text-center text-zinc-400 text-sm font-semibold font-['Pretendard']">
            캐시 내역
          </div>
          <div className="grow shrink basis-0 text-center text-yellow-400 text-sm font-bold font-['Pretendard Variable']">
            이용권 내역
          </div>
          <div className="grow shrink basis-0 text-center text-zinc-400 text-sm font-semibold font-['Pretendard']">
            쿠폰 등록
          </div>
        </div>
        <div className="self-stretch h-0.5 relative">
          <div className=" h-px left-0 top-0 absolute bg-zinc-100 rounded-full" />
          <div className="w-32 h-0.5 left-[131px] top-0 absolute bg-gradient-to-br from-yellow-400 via-red-600 to-blue-800 rounded-full" />
        </div>
      </div>
      <div className="h-4"></div>
      <div className="w-full h-96 px-5 flex-col justify-start items-start gap-4 inline-flex">
        <div className="text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
          최근 본 선생님
        </div>
        <div className="self-stretch p-4 bg-neutral-50 rounded-2xl border border-zinc-100 justify-center items-start gap-3 inline-flex">
          <div className="w-20 h-20 bg-zinc-100 rounded-xl" />
          <div className="grow shrink basis-0 self-stretch flex-col justify-between items-start inline-flex">
            <div className="w-56 text-zinc-900 text-base font-bold font-['Pretendard Variable'] leading-snug">
              이것은 타이틀입니다
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
        <div className="self-stretch p-4 bg-neutral-50 rounded-2xl border border-zinc-100 justify-center items-start gap-3 inline-flex">
          <div className="w-20 h-20 bg-zinc-100 rounded-xl" />
          <div className="grow shrink basis-0 self-stretch flex-col justify-between items-start inline-flex">
            <div className="w-56 text-zinc-900 text-base font-bold font-['Pretendard Variable'] leading-snug">
              이것은 타이틀입니다
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
        <div className="self-stretch p-4 bg-neutral-50 rounded-2xl border border-zinc-100 justify-center items-start gap-3 inline-flex">
          <div className="w-20 h-20 bg-zinc-100 rounded-xl" />
          <div className="grow shrink basis-0 self-stretch flex-col justify-between items-start inline-flex">
            <div className="w-56 text-zinc-900 text-base font-bold font-['Pretendard Variable'] leading-snug">
              이것은 타이틀입니다
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
      </div>
    </div>
  )
}
