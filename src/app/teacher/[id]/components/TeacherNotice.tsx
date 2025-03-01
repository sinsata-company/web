import { TeacherDetailDto } from '@/app/api/data'
import Image from 'next/image'

export default function TeacherNotice({
  advisor,
}: {
  advisor: TeacherDetailDto | null
}) {
  return (
    <div className="w-full  flex-col justify-start items-start gap-3 inline-flex">
      <div className="text-black text-xl font-bold ">상담가 공지사항</div>
      <div className="w-full h-64 relative aspect-w-16 aspect-h-9">
        {advisor?.noticeImgURI && (
          <Image
            src={advisor?.noticeImgURI ?? ''}
            alt="notice-image"
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <div className="self-stretch p-4 bg-neutral-50 rounded-2xl flex-col justify-start items-start gap-2 flex">
        <div className="self-stretch text-neutral-500 text-sm font-medium  leading-tight">
          {advisor?.notice}
        </div>
      </div>
    </div>
  )
}
