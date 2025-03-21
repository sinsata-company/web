import { TeacherDetailDto } from '@/app/api/data'
import { useRouter } from 'next/navigation'
import {Button, BUTTON_TYPE} from '@/components/common/Button'

export default function TeacherAdvance({
  advisor,
}: {
  advisor: TeacherDetailDto | null
}) {
  const router = useRouter()

  return (
    <div className="w-full flex-col justify-start items-start gap-3 inline-flex">
      <div className="flex justify-between items-center w-full space-x-4">
        <div className="text-black text-base font-bold">상담사가 잘 하는 분야</div>
        <div className="flex-shrink-0">
          <Button
              className="w-25 h-8 text-xs !min-w-0 !px-3"
              onClick={() => {
                  const teacherInfo = {
                      id: advisor?.id,
                      name: advisor?.name,
                      teacherType: advisor?.teacherType,
                      pinNumber: advisor?.pinNumber,
                      profileImage: advisor?.images[0],
                      category: advisor?.teacherType
                  }
                  const queryParams = encodeURIComponent(JSON.stringify(teacherInfo))
                  router.push(`/chats/inquiry/${advisor?.id}/note?info=${queryParams}`)
              }}
              buttonType={BUTTON_TYPE.primary}
              label="1:1 문의"
          />
        </div>
      </div>
      <div className="self-stretch text-zinc-900 text-base whitespace-pre-line">
        {advisor?.strongField}
      </div>
      <div className="justify-start items-start gap-2 inline-flex">
        {advisor?.hashtag?.split('#')?.map((tag, index) => {
          if (tag == '') return
          return (
            <div
              key={index}
              className="px-2 py-1 bg-indigo-400/10 rounded-full justify-center items-center gap-1 flex"
            >
              <div className="text-indigo-400 text-xs font-bold leading-tight">
                #{tag}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
