const ReviewItem = () => {
  return (
    <div className="self-stretch h-48 p-4 bg-neutral-50 rounded-2xl flex-col justify-start items-start gap-2 flex">
      <div className="self-stretch justify-start items-center gap-2 inline-flex">
        <img
          className="w-12 h-12 rounded-full border border-zinc-100"
          src="https://via.placeholder.com/52x52"
        />
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
          <div className="self-stretch text-zinc-900 text-base font-bold ">
            홍수아
          </div>
          <div className="self-stretch text-zinc-400 text-sm font-medium ">
            2024.10.10
          </div>
        </div>
      </div>
      <div className="justify-start items-center gap-1 inline-flex">
        <div className="w-3 h-3 flex-col justify-start items-start gap-2.5 inline-flex" />
        <div className="text-zinc-900 text-sm font-bold  leading-tight">
          4.0 만족해요
        </div>
      </div>
      <div className="self-stretch text-neutral-500 text-sm font-medium  leading-tight">
        한 번 더 방문하고 싶은 곳이었습니다. 한 번 더 방문하고 싶은
        곳이었습니다. 한 번 더 방문하고 싶은 곳이었습니다...
      </div>
      <div className="text-zinc-400 text-sm font-bold ">더보기</div>
    </div>
  )
}

export default ReviewItem
