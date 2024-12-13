import { IMessage } from '../page'

export default function MyChat({ message, authorId }: IMessage) {
  return (
    <div className="self-stretch flex justify-end">
      <div className="h-10 shrink px-3 py-2 bg-blue-800 rounded-xl justify-end items-center gap-2.5 inline-flex">
        <div className="inline-flex text-white text-base font-normal font-['Pretendard'] leading-normal">
          {message}
        </div>
      </div>
    </div>
  )
}
