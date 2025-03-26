import { ChatDto, IMessage } from '@/app/api/data'
import UserLevelIcon from '@/components/common/UserLevelIcon'
import { UserDto } from '@/types/user'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

export interface IMyChat extends IMessage {
  user: UserDto | null
  isContinued: boolean
  isTeacher: boolean
  chat?: ChatDto | null
}

export default function GroupChat({
  message,
  authorId,
  user,
  isContinued,
  isTeacher,
  chat,
}: IMyChat) {
  const path = usePathname()

  const profileImageUrl = (() => {
    if (user?.type === 'TEACHER') {
      return chat?.teacherProfile;
    } else {
      return `/images/membership/${user?.level}.png`;
    }
  })();

  return (
    <div className="self-stretch flex justify-end items-end">
    <div className="flex flex-col justify-end items-end ">
    {!isTeacher && !isContinued && (
    <div className="flex items-center text-zinc-900 text-sm font-bold">
      <Image
        src={profileImageUrl || '/logo.jpg'}
        width={24}
        height={24}
        className="mr-2"
        alt="user profile"
      />
      {path.includes('group') ? user?.nickname : user?.name}
    </div>
    )}
    <div className="h-10 shrink px-3 py-2 bg-blue-800/10 rounded-xl justify-end items-center gap-2.5 inline-flex">
    <div className="inline-flex text-zinc-900 text-base font-normal leading-normal">
    {message}
    </div>
    </div>
    </div>
    </div>
    )
}
