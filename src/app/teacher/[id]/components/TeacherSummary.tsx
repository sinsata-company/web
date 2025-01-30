import { TeacherDetailDto } from '@/app/api/data'
import { IAdvisor } from '@/dummy/dummyTeacher'
import Image from 'next/image'

export default function TeacherSummary({
  advisor,
}: {
  advisor: TeacherDetailDto | null
}) {
  return (
    <div className="w-full sh-20 flex justify-start items-start gap-2">
      <div className="flex-grow flex-shrink-0 flex flex-col justify-start items-start gap-4">
        <div className="w-full text-yellow-400 text-base font-bold font-['Pretendard Variable']">
          상담사명
        </div>
        <div className="w-full text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
          {advisor?.name}
        </div>
      </div>
      <div className="p-2 bg-red-600/10 rounded-full flex justify-center items-center gap-1">
        <Image src={'/images/ic_chat.svg'} width={20} height={20} alt="chat" />
        <div className="text-red-600 text-base font-bold font-['Pretendard Variable'] leading-tight">
          채팅하기
        </div>
      </div>
    </div>
  )
}
