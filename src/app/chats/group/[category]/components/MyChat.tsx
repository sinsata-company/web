import { UserDto } from '@/types/user'
import { IMessage } from '../page'
import Image from 'next/image'

export interface IMyChat extends IMessage {
  user: UserDto | null
  isContinued: boolean
}

export default function MyChat({
  message,
  authorId,
  user,
  isContinued,
}: IMyChat) {
  return (
    <div className="self-stretch flex justify-end items-end">
      <div className="flex flex-col justify-end items-end ">
        {!isContinued && (
          <div className="flex items-center text-zinc-900 text-sm font-bold">
            <Image
              src={'/images/membership/' + user?.level + '.png'}
              width={24}
              height={24}
              alt="level"
            />
            {user?.nickname}
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
