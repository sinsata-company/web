import { IMessage } from '../page'

export default function OthersChat({ message, authorId }: IMessage) {
  return (
    <div className="self-stretch flex justify-start">
      <div className="h-10 px-3 py-2 bg-blue-800/10 rounded-xl justify-center items-center gap-1 inline-flex">
        <div className="text-zinc-900 text-base font-normal font-['Pretendard'] leading-normal">
          {message}
        </div>
      </div>
    </div>
  )
}
