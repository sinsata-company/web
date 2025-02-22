const ChatInform = ({ status }: { status: string }) => {
  return (
    <div className="text-center px-3 text-neutral-500 text-sm font-normal font-['Pretendard Variable'] leading-tight">
      안녕하세요 신사타 입니다.
      <br /> 선생님께서 입장하시면 10초마다 1400원씩 과급됩니다.
      <br /> 입장 전까지 비용이 청구되지 않으며, 채팅 입력이 불가합니다.
      <br /> 욕설 및 비방, 선생님에게 상처를 주는 대화는 삼가해 주세요.
    </div>
  )
}

export default ChatInform
