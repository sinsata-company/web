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
  const profileImageUrl = (() => {
    if (user?.type === 'TEACHER') {
      return chat?.teacherProfile;
    } else {
      return `/images/membership/${user?.level}.png`;
    }
  })();
  
  return (
    <div className="flex flex-col justify-start gap-2 items-end">
      {!isContinued && (
        <div className="flex items-center text-zinc-900 text-sm font-bold">
          {isMyMessage && user ? (
            <>
              <Image
                src={profileImageUrl || '/logo.jpg'}
                width={24}
                height={24}
                className="mr-2"
                alt="user profile"
              />
              {user.name}
            </>
          ) : (
            <>
              <Image
                src={profileImageUrl || '/logo.jpg'}
                width={24}
                height={24}
                className="mr-2"
                alt="level"
              />
              {chat?.teacherName}
            </>
          )}
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
