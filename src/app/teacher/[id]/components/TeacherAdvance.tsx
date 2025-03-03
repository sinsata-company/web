import { TeacherDetailDto } from '@/app/api/data'

export default function TeacherAdvance({
  advisor,
}: {
  advisor: TeacherDetailDto | null
}) {
  return (
    <div className="w-full  flex-col justify-start items-start gap-3 inline-flex">
      <div className="text-black text-xl font-bold ">상담사가 잘 하는 분야</div>
      <div className="self-stretch text-zinc-900 text-xl    whitespace-pre-line">
        {advisor?.strongField}
      </div>
      <div className="justify-start items-start gap-2 inline-flex">
        {advisor?.hashtag?.split('#')?.map((tag, index) => {
          if (tag == '') return
          return (
            <div
              key={index}
              className="px-3 py-2 bg-indigo-400/10 rounded-full justify-center items-center gap-1 flex"
            >
              <div className="text-indigo-400 text-sm font-bold  leading-tight">
                #{tag}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
