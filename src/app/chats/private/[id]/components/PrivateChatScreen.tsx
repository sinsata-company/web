'use client'

import { getMyInfo } from '@/app/api/user'

import { UserDto } from '@/types/user'
import { useEffect, useState, useRef } from 'react'
import MyChat from '@/app/chats/components/MyChat'

import ChatInform from './ChatInform'
import { ChatDto, IMessage } from '@/app/api/data'
import TeacherChat from './TeacherChat'

const checkIsUser = async () => {
  try {
    getMyInfo();
    return true;
  } catch (err: unknown) {
    console.error(err);
    return false;
  }
}

export default function PrivateChatScreen({
  messages,
  myId,
  user,
  chat,
  isOutsideReservationTime = false
}: {
  messages: IMessage[]
  myId: string
  user: UserDto | null
  chat: ChatDto | null,
  isOutsideReservationTime?: boolean
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isUser, setIsUser] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    checkIsUser().then(setIsUser);
  }, []);

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div
      style={{
        marginTop: 15,
        height: 'calc(100vh - 120px)',
      }}
      className="inline-flex flex-col py-2 px-5 gap-2.5 w-full overflow-y-auto mb-[105px]"
    >
      <ChatInform chat={chat} isOutsideReservationTime={isOutsideReservationTime} />
      {messages.map((item, idx) => {
        const isMyMessage = item.authorId === myId;
        
        if (isMyMessage) {
          return (
            <TeacherChat
              key={idx}
              {...item}
              chat={chat}
              user={user}
              isMyMessage={true}
              isContinued={idx > 0 && messages[idx - 1].authorId === myId}
            />
          );
        } else {
          return (
            <MyChat
            key={idx}
            {...item}
            user={user}
            isContinued={idx > 0 && messages[idx - 1].authorId !== myId}
          />

          );
        }
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
