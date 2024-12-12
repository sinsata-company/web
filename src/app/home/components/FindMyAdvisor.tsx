import { clsx } from 'clsx'

export default function FindMyAdvisor() {
  return (
    <div className={clsx('bottom-20 left-0 fixed  w-full px-5')}>
      <div
        className="px-2 py-3 rounded-xl flex-col justify-center items-center gap-1 flex grow"
        style={{
          borderRadius: 12,
          background:
            'var(--Gradient-1, linear-gradient(121deg, #F9C00F 3.88%, #E62419 59.99%, #21499C 115.85%))',
        }}
      >
        <div
          className={clsx(
            "text-base text-white font-bold font-['Pretendard Variable'] leading-tight"
          )}
        >
          내가 맞는 선생님 찾기
        </div>
      </div>
    </div>
  )
}
