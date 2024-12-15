import BackAppbar from '@/components/common/BackAppbar'

export default function CashChargePage() {
  return (
    <div>
      <BackAppbar />

      <div className="w-full px-5 flex-col justify-start items-start gap-6 inline-flex">
        <div className="self-stretch h-14 p-4 bg-gradient-to-br from-yellow-400 via-red-600 to-blue-800 rounded-xl justify-between items-center inline-flex">
          <div className="text-white text-base font-medium font-['Pretendard Variable']">
            보유 캐시
          </div>
          <div className="text-white text-base font-bold font-['Pretendard Variable']">
            20 캐시
          </div>
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-3 flex">
          <div className="text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
            캐시 충전
          </div>
          <div className="self-stretch p-4 rounded-2xl border-2 border-yellow-400 flex-col justify-start items-start gap-4 flex">
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-zinc-900 text-base font-bold font-['Pretendard Variable']">
                1,250캐시
              </div>
              <div className="px-4 py-3 bg-red-600/10 rounded-xl justify-start items-center gap-3 flex">
                <div className="text-red-600 text-base font-medium font-['Pretendard Variable']">
                  ₩
                </div>
                <div className="text-red-600 text-base font-bold font-['Pretendard Variable']">
                  1,500
                </div>
              </div>
            </div>
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-zinc-900 text-base font-bold font-['Pretendard Variable']">
                1,250캐시
              </div>
              <div className="px-4 py-3 bg-red-600/10 rounded-xl justify-start items-center gap-3 flex">
                <div className="text-red-600 text-base font-medium font-['Pretendard Variable']">
                  ₩
                </div>
                <div className="text-red-600 text-base font-bold font-['Pretendard Variable']">
                  1,500
                </div>
              </div>
            </div>
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-zinc-900 text-base font-bold font-['Pretendard Variable']">
                1,250캐시
              </div>
              <div className="px-4 py-3 bg-red-600/10 rounded-xl justify-start items-center gap-3 flex">
                <div className="text-red-600 text-base font-medium font-['Pretendard Variable']">
                  ₩
                </div>
                <div className="text-red-600 text-base font-bold font-['Pretendard Variable']">
                  1,500
                </div>
              </div>
            </div>
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-zinc-900 text-base font-bold font-['Pretendard Variable']">
                1,250캐시
              </div>
              <div className="px-4 py-3 bg-red-600/10 rounded-xl justify-start items-center gap-3 flex">
                <div className="text-red-600 text-base font-medium font-['Pretendard Variable']">
                  ₩
                </div>
                <div className="text-red-600 text-base font-bold font-['Pretendard Variable']">
                  1,500
                </div>
              </div>
            </div>
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="w-44 flex-col justify-start items-start gap-1 inline-flex">
                <div className="text-red-600 text-xs font-bold font-['Pretendard Variable']">
                  인기
                </div>
                <div className="text-zinc-900 text-base font-bold font-['Pretendard Variable']">
                  1,250캐시
                </div>
              </div>
              <div className="px-4 py-3 bg-red-600/10 rounded-xl justify-start items-center gap-3 flex">
                <div className="text-red-600 text-base font-medium font-['Pretendard Variable']">
                  ₩
                </div>
                <div className="text-red-600 text-base font-bold font-['Pretendard Variable']">
                  1,500
                </div>
              </div>
            </div>
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-zinc-900 text-base font-bold font-['Pretendard Variable']">
                1,250캐시
              </div>
              <div className="px-4 py-3 bg-red-600/10 rounded-xl justify-start items-center gap-3 flex">
                <div className="text-red-600 text-base font-medium font-['Pretendard Variable']">
                  ₩
                </div>
                <div className="text-red-600 text-base font-bold font-['Pretendard Variable']">
                  1,500
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
