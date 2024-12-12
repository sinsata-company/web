export default function AdCarousel() {
  return (
    <div className="px-5 w-full h-60 flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch h-60 bg-zinc-100 rounded-2xl">
        <div className="p-3 justify-start items-center gap-2.5 inline-flex">
          <div className="w-10 h-10 px-1 bg-black/50 rounded-lg justify-center items-center gap-2.5 flex" />
          <div className="p-3 justify-start items-center gap-2.5 inline-flex">
            <div className="p-2 bg-black/50 rounded-lg justify-center items-center gap-2.5 flex">
              <div className="text-white text-xs font-bold font-['Pretendard Variable']">
                $100
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
