import Image from 'next/image'

export default function ChatWriter({
  sendMessage,
  message,
  setMessage,
}: {
  sendMessage: Function
  message: string
  setMessage: Function
}) {
  return (
    <div className=" fixed bottom-0 left-0  w-full h-28 px-5 pt-4 pb-10 bg-white border-t border-zinc-100 flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch h-12 p-3 bg-zinc-100 rounded-xl justify-between items-center inline-flex">
        <input
          value={message}
          onChange={(e) => {
            const text = e.target.value

            setMessage(text)
          }}
          onKeyUp={(e) => {
            if (e.key == 'Enter') {
              sendMessage()
              setMessage('')
            }
          }}
          placeholder="메세지 입력"
          className="w-full bg-zinc-100 text-zinc-400 text-base font-normal font-['Pretendard'] leading-normal"
          style={{
            outline: 'none',
          }}
        />
        <div className="justify-start items-center gap-5 flex">
          {/* <Image
            src={'/images/ic_attach.svg'}
            width={24}
            height={24}
            alt="attach"
          /> */}
          <Image
            onClick={() => {
              sendMessage()
              setMessage('')
            }}
            src={'/images/ic_send.svg'}
            width={24}
            height={24}
            alt="send"
          />
        </div>
      </div>
    </div>
  )
}
