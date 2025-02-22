export default function ChatStatus({ status }: { status: string }) {
  let label
  switch (status) {
    case 'RESERVE':
      label = '상담 예약'
      break
    case 'REQUEST':
      label = '실시간 채팅 요청'
      break
    case 'PROGRESS':
      label = '상담 진행 중'
      break
    case 'END':
      label = '상담 완료'
      break
    default:
      label = '알 수 없음'
  }
  return (
    <div className="h-5 px-1.5 py-2 rounded-full border border-yellow-500 justify-center items-center gap-1 inline-flex">
      <div className="text-yellow-500 text-xs font-medium font-['Pretendard Variable'] leading-tight">
        {label}
      </div>
    </div>
  )
}
