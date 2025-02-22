import { IMessage } from '@/app/api/data'
import UserLevelIcon from '@/components/common/UserLevelIcon'
import { UserDto } from '@/types/user'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

export interface IMyChat extends IMessage {
  user: UserDto | null
  isContinued: boolean
  isTeacher?: boolean
}

export default function MyChat({
  message,
  authorId,
  user,
  isContinued,
  isTeacher,
}: IMyChat) {
  console.log(isTeacher)
  const path = usePathname()

  return (
    <div className="self-stretch flex justify-end items-end">
      <div className="flex flex-col justify-end items-end ">
        {!isTeacher && !isContinued && (
          <div className="flex items-center text-zinc-900 text-sm font-bold">
            <UserLevelIcon level={user?.level ?? ''} />
            {path.includes('group') ? user?.nickname : user?.name}
          </div>
        )}
        <div className="h-10 shrink px-3 py-2 bg-blue-800 rounded-xl justify-end items-center gap-2.5 inline-flex">
          <div className="inline-flex text-white text-base font-normal font-['Pretendard'] leading-normal">
            {message}
          </div>
        </div>
      </div>
    </div>
  )
}
