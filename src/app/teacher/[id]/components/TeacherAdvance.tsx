export default function TeacherAdvance() {
  return (
    <div className="w-full  flex-col justify-start items-start gap-3 inline-flex">
      <div className="self-stretch text-yellow-400 text-base font-bold font-['Pretendard Variable']">
        상담사가 잘 하는 분야
      </div>
      <div className="self-stretch text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
        저는 OO을 잘합니다.
      </div>
      <div className="justify-start items-start gap-2 inline-flex">
        <div className="px-3 py-2 bg-red-600/10 rounded-full justify-center items-center gap-1 flex">
          <div className="text-red-600 text-sm font-bold font-['Pretendard Variable'] leading-tight">
            #신점
          </div>
        </div>
        <div className="px-3 py-2 bg-red-600/10 rounded-full justify-center items-center gap-1 flex">
          <div className="text-red-600 text-sm font-bold font-['Pretendard Variable'] leading-tight">
            #직장
          </div>
        </div>
        <div className="px-3 py-2 bg-red-600/10 rounded-full justify-center items-center gap-1 flex">
          <div className="text-red-600 text-sm font-bold font-['Pretendard Variable'] leading-tight">
            #연애상담
          </div>
        </div>
      </div>
    </div>
  )
}
