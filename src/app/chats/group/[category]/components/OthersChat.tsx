import { IMessage } from '@/app/api/data'
import Image from 'next/image'

export default function OthersChat({
  message,
  authorId,
  level,
  nickname,
  isContinued,
}: IMessage & { isContinued: boolean }) {
  return (
    <div className="self-stretch flex justify-start">
      {!isContinued && (
        <div className="flex items-center text-zinc-900 text-sm font-bold">
          <Image
            src={'/images/membership/' + level + '.png'}
            width={24}
            height={24}
            alt="level"
            className="mr-2"
          />
          {nickname}
        </div>
      )}
      <div className="h-10 px-3 py-2 bg-blue-800/10 rounded-xl justify-center items-center gap-1 inline-flex">
        <div className="text-zinc-900 text-base font-normal  leading-normal">
          {message}
        </div>
      </div>
    </div>
  )
}
