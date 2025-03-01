import { ChatDto, IMessage } from '@/app/api/data'
import Image from 'next/image'

export default function TeacherChat({
  message,
  chat,
  isContinued,
}: IMessage & { isContinued: boolean; chat: ChatDto | null }) {
  return (
    <div className=" flex flex-col justify-start gap-2 items-start">
      {!isContinued && (
        <div className="flex items-center text-zinc-900 text-sm font-bold">
          <Image
            src={chat?.teacherProfile ? chat.teacherProfile : '/logo.jpg'}
            width={24}
            height={24}
            className="mr-2"
            alt="level"
          />
          {chat?.teacherName}
        </div>
      )}
      <div className="h-10 inline-flex items-start shrink px-3 py-2 bg-blue-800/10 rounded-xl gap-1 ">
        <div className="text-zinc-900 inline text-base font-normal  leading-normal">
          {message}
        </div>
      </div>
    </div>
  )
}
