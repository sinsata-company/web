import clsx from 'clsx'

export default function ChatStatus({ status }: { status: string }) {
  let label
  let color
  let text
  switch (status) {
    case 'RESERVE':
      label = '상담 예약'
      color = 'bg-orange-300/10'
      text = 'text-orange-300'
      break
    case 'REQUEST':
      label = '실시간 채팅 요청'
      color = 'bg-orange-300/10'
      text = 'text-orange-300'
      break
    case 'PROGRESS':
      label = '상담 진행 중'
      color = 'bg-indigo-400/10'
      text = 'text-indigo-400'
      break
    case 'END':
      label = '상담 완료'
      color = 'bg-red-400/10'
      text = 'text-red-400'
      break
    default:
      label = '알 수 없음'
      color = 'bg-orange-300/10'
      text = 'text-orange-300'
  }
  return (
    <div
      className={clsx(
        'h-5 px-1.5 py-2 rounded-sm justify-center items-center inline-flex',
        color,
        text
      )}
    >
      <div className="text-xs font-bold font-['Pretendard Variable'] leading-tight">
        {label}
      </div>
    </div>
  )
}
