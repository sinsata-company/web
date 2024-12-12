import BTB from '@/components/common/Btb'
import MainAppbar from '@/components/common/MainAppbar'

export default function SearchPage() {
  return (
    <div>
      <MainAppbar />
      <div className="w-full h-96 px-5 flex-col justify-start items-center gap-8 inline-flex">
        <div className="self-stretch h-28 flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-900 text-2xl font-bold font-['Pretendard Variable']">
            생년원일을 입력해주시면
            <br />더 정확한 상담이 가능합니다
          </div>
          <div className="p-2 bg-red-600/10 rounded-full justify-center items-center gap-1 inline-flex">
            <div className="w-4 h-4 relative" />
            <div className="text-red-600 text-base font-bold font-['Pretendard Variable'] leading-tight">
              음성 녹음해서 보내기
            </div>
          </div>
        </div>
        <div className="self-stretch h-56 flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch h-48 p-4 rounded-xl border border-zinc-400 justify-start items-start gap-3 inline-flex">
            <div className="grow shrink basis-0 self-stretch text-zinc-400 text-base font-normal font-['Pretendard'] leading-tight">
              새로운 상담 내용을 입력해주세요
            </div>
          </div>
          <div className="text-zinc-400 text-sm font-normal font-['Pretendard'] leading-tight">
            0/1000
          </div>
        </div>
        <div className="self-stretch h-12 px-3 bg-gradient-to-br from-yellow-400 via-red-600 to-blue-800 rounded-xl justify-center items-center gap-1 inline-flex">
          <div className="text-center text-white text-base font-bold font-['Pretendard Variable']">
            찾기
          </div>
        </div>
      </div>
      <BTB />
    </div>
  )
}
