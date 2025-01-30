import ChatStatus from './ChatStatus'

export default function ChatItem() {
  return (
    <div className="w-full h-32 p-4 bg-yellow-500/20 rounded-2xl justify-center items-start gap-3 inline-flex">
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
        <ChatStatus />
        <div className="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
          <div className="self-stretch h-10 flex-col justify-start items-start gap-0.5 flex">
            <div className="self-stretch text-zinc-900 text-base font-bold font-['Pretendard Variable']">
              홍수아
            </div>
            <div className="self-stretch text-neutral-500 text-sm font-normal font-['Pretendard'] leading-tight">
              계약했습니다!
            </div>
          </div>
          <div className="self-stretch text-zinc-400 text-xs font-normal font-['Pretendard']">
            2024.11.11 - 2024.11-14
          </div>
        </div>
      </div>
      <div className="w-20 h-20 bg-white rounded-xl">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          alt="profile"
          className="w-20 h-20 rounded-xl"
        />
      </div>
    </div>
  )
}
