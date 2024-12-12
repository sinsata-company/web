export default function ChatItem() {
  return (
    <div className="w-full h-32 p-4 bg-yellow-500/20 rounded-2xl justify-center items-start gap-3 inline-flex">
      <img
        className="w-10 h-10 rounded-full border border-zinc-100"
        src="https://via.placeholder.com/40x40"
      />
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
        <div className="h-5 px-1.5 py-2 rounded-full border border-yellow-500 justify-center items-center gap-1 inline-flex">
          <div className="text-yellow-500 text-xs font-medium font-['Pretendard Variable'] leading-tight">
            이용문의
          </div>
        </div>
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
      <div className="w-20 h-20 bg-white rounded-xl" />
    </div>
  )
}
