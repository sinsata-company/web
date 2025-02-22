const ChatSummary = () => {
  return (
    <div className="flex flex-col justify-between items-start p-4 border-b-2 border-neutral-200 ">
      <div className="w-full flex justify-start items-center gap-4">
        <div className="text-neutral-800 text-lg font-bold font-['Pretendard']">
          홍수아
        </div>
        <div className="px-2 bg-orange-300/10 rounded-lg flex justify-center items-center">
          <div className="text-orange-300 text-base font-bold font-['Pretendard']">
            이용문의
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2 mt-2">
        <div className="w-4 h-4 bg-lime-300 rounded-full"></div>
        <div className="text-center text-neutral-400 text-base font-semibold font-['Pretendard']">
          온라인
        </div>
      </div>
    </div>
  )
}

export default ChatSummary
