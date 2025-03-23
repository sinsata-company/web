import { ChatDto, IMessage } from '@/app/api/data'
import { UserDto } from '@/types/user'
import Image from 'next/image'

export default function TeacherInquiryChat({
  message,
  chat,
  isContinued,
  isMyMessage = false,
  user,
  nickname,
}: IMessage & { 
  isContinued: boolean; 
  chat: ChatDto | null;
  isMyMessage?: boolean;
  user?: UserDto | null;
}) {
  const displayName = isMyMessage ? `선생님 ${user?.nickname}` : chat?.userName;
  const profileImage = isMyMessage ? (chat?.teacherProfile ?? '/logo.jpg') : `/images/membership/${chat?.userLevel}.png`;

  return (
    <div className={`flex flex-col justify-start gap-2 ${isMyMessage ? 'items-end' : 'items-start'}`}>
      {!isContinued && (
        <div className="flex items-center text-zinc-900 text-sm font-bold">
          <Image
            src={profileImage}
            width={24}
            height={24}
            className="mr-2"
            alt={isMyMessage ? "teacher profile" : "user profile"}
          />
          {displayName}
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