import { ChatDto, IMessage } from '@/app/api/data'
import UserLevelIcon from '@/components/common/UserLevelIcon'
import { cn } from '@/lib/utils'
import { UserDto } from '@/types/user'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

export interface IMyChat extends IMessage {
  user: UserDto | null
  isContinued: boolean
  isTeacher: boolean
  chat?: ChatDto | null
  flip?: boolean;
}

export default function MyChat({
  message,
  authorId,
  user,
  isContinued,
  isTeacher,
  chat,
  flip
}: IMyChat) {
  const path = usePathname()
  
  const profileImageUrl = (() => {
    // 내가 선생님이면 상대방은 학생, 내가 학생이면 상대방은 선생님
    if (!isTeacher) {
      return `/images/membership/${chat?.userLevel || user?.level}.png`;
    } else {
      return chat?.teacherProfile;
    }
  })();

  return (
    <div className={cn([
      'self-stretch flex items-start',
      flip ? 'justify-end' : 'justify-start'
    ])}>
      <div className="flex flex-col justify-start items-start">
        {!isContinued && (
          <div className="flex items-center text-zinc-900 text-sm font-bold pb-1">
            <Image
              src={profileImageUrl || '/logo.jpg'}
              width={24}
              height={24}
              className="mr-2"
              alt="user profile"
            />
            {!isTeacher ? chat?.userName || user?.name  : chat?.teacherName}
          </div>
        )}
        <div className="h-10 shrink px-3 py-2 bg-blue-800 rounded-xl justify-start items-center gap-2.5 inline-flex">
          <div className="inline-flex text-white text-base font-normal leading-normal">
            {message}
          </div>
        </div>
      </div>
    </div>
  )
}
