'use client'

import { useRouter } from 'next/navigation'

export default function AdvisorList() {
  return (
    <div className="inline-flex flex-col gap-2.5">
      <AdvisorItem />
      <AdvisorItem />
      <AdvisorItem />
      <AdvisorItem />
      <AdvisorItem />
      <div className="h-32"></div>
    </div>
  )
}

function AdvisorItem() {
  const nav = useRouter()
  return (
    <div
      onClick={() => {
        nav.push('/teacher/1')
      }}
      className="w-full h-28 p-4 bg-neutral-50 rounded-2xl border border-zinc-100 justify-start items-center gap-3 inline-flex"
    >
      <div className="w-20 h-20 bg-zinc-100 rounded-xl" />
      <div className="flex-col justify-center items-start gap-2 inline-flex">
        <div className="w-56 text-zinc-900 text-base font-bold font-['Pretendard Variable']">
          신사타 전문 선생님
          <br />
          #사주 #연애 #사업
        </div>
        <div className="justify-start items-center gap-1 inline-flex">
          {/* <div className="w-4 h-4 relative" /> */}
          <div className="text-yellow-400 text-sm font-bold font-['Pretendard Variable'] leading-tight">
            신년이 시작되기 전에 새로운 연애/사업 기회를 찾아보세요.
          </div>
        </div>
      </div>
    </div>
  )
}
