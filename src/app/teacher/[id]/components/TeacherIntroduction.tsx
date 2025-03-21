export default function TeacherIntroduciton({
  introduction,
}: {
  introduction?: string
}) {
  return (
    <div className="w-full flex-col justify-start items-start gap-3 inline-flex">
      <div className="text-black text-base font-bold">상담사 소개</div>
      <div className="self-stretch p-3 bg-neutral-50 rounded-2xl flex-col justify-start items-start gap-2 flex">
        <div className="self-stretch text-neutral-500 text-xs font-medium leading-tight whitespace-pre-line">
          {introduction}
        </div>
      </div>
    </div>
  )
}
