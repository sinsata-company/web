export default function CouponInput() {
  return (
    <div className="w-full flex-col justify-start items-start gap-8 inline-flex">
      <div className="self-stretch flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch justify-start items-start gap-3 inline-flex">
          <div className="grow shrink basis-0 h-14 p-4 rounded-xl border border-zinc-400 justify-start items-center gap-3 flex">
            <div className="grow shrink basis-0 self-stretch text-zinc-400 text-base font-normal ">
              쿠폰 코드를 입력해주세요
            </div>
          </div>
          <div className="px-8 h-full bg-gradient rounded-xl justify-center items-center gap-2 flex">
            <div className="text-center text-white text-base font-bold  capitalize">
              등록
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
