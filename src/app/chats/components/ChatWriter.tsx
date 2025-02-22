'use client'

import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Image from 'next/image'

export default function ChatWriter({
  sendMessage,
  message,
  setMessage,
  actionButton,
  disabled,
}: {
  sendMessage: Function
  message: string
  setMessage: Function
  actionButton?: React.ReactNode
  disabled?: boolean
}) {
  console.log(disabled)
  const expire = window.localStorage.getItem('sst-access-token-expire-at')
  const isLogin =
    window.localStorage.getItem('sst-access-token') &&
    expire &&
    expire &&
    Number(expire) > Date.now()
  return (
    <div className="max-w-[550px] w-full mx-auto  fixed bottom-0 left-0 right-0 w-full  px-5 pt-4 pb-10 bg-white border-t border-zinc-100 flex-col justify-start items-start gap-2.5 inline-flex">
      {actionButton
        ? actionButton
        : !isLogin && (
            <Button
              buttonType={BUTTON_TYPE.primary}
              label="로그인하러가기"
              onClick={() => {
                window.location.href = '/register'
              }}
            />
          )}
      <div className="self-stretch h-12 p-3 bg-zinc-100 rounded-xl justify-between items-center inline-flex">
        <input
          value={message}
          onChange={(e) => {
            const text = e.target.value
            setMessage(text)
          }}
          // disabled={true}
          disabled={disabled || !isLogin}
          onKeyUp={(e) => {
            if (e.key == 'Enter') {
              sendMessage()
              setMessage('')
            }
          }}
          placeholder="메세지 입력"
          className="w-full bg-zinc-100  text-base font-normal font-['Pretendard'] leading-normal"
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
