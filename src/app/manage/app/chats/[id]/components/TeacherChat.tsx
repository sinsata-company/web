import { ChatDto, IMessage } from '@/app/api/data'
import { UserDto } from '@/types/user'
import Image from 'next/image'

export default function TeacherChat({
  message,
  chat,
  isContinued,
  isMyMessage = false,
  user,
}: IMessage & { 
  isContinued: boolean; 
  chat: ChatDto | null;
  isMyMessage?: boolean;
  user?: UserDto | null;
}) {
  return (
    <div className={`flex flex-col justify-start gap-2 ${isMyMessage ? 'items-end' : 'items-start'}`}>
      {!isContinued && (
        <div className="flex items-center text-zinc-900 text-sm font-bold">
          {!isMyMessage ? (
            <>
              <Image
                src={`/images/membership/${chat?.userLevel}.png`}
                width={24}
                height={24}
                className="mr-2"
                alt="user profile"
              />
              {chat?.userName}
            </>
          ) : (
            <>
              <Image
                src={chat?.teacherProfile ?? '/logo.jpg'}
                width={24}
                height={24}
                className="mr-2"
                alt="teacher profile"
              />
              {user?.nickname}
            </>
          )}
        </div>
      )}
      <div className={`h-10 inline-flex items-start shrink px-3 py-2 rounded-xl gap-1 ${
        isMyMessage ? 'bg-blue-500 text-white' : 'bg-blue-800/10 text-zinc-900'
      }`}>
        <div className="inline text-base font-normal leading-normal">
          {message}
        </div>
      </div>
    </div>
  )
} 