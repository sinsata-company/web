'use client'

import { UserDto } from '@/types/user'
import { useEffect, useRef } from 'react'
import MyChat from '@/app/chats/components/MyChat'
import { ChatDto, IMessage } from '@/app/api/data'
import TeacherChat from './TeacherChat'
import ChatInform from './ChatInform'

export default function TeacherChatScreen({
  messages,
  myId,
  user,
  chat,
}: {
  messages: IMessage[]
  myId: string
  user: UserDto | null
  chat: ChatDto | null
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      style={{
        marginTop: 15,
        height: 'calc(100vh - 220px)',
        paddingBottom: '60px',
      }}
      className="inline-flex flex-col py-2 px-5 gap-2.5 w-full overflow-y-auto"
    >
      <ChatInform chat={chat} />
      {messages.map((item, idx) => {
        const isTeacherMessage = item.authorId === myId;
        return isTeacherMessage ? (
          <TeacherChat
            key={idx}
            {...item}
            chat={chat}
            user={user}
            isMyMessage={true}
            isContinued={idx > 0 && messages[idx - 1].authorId === myId}
          />
        ) : (
          <TeacherChat
            key={idx}
            {...item}
            chat={chat}
            isMyMessage={false}
            isContinued={idx > 0 && messages[idx - 1].authorId === item.authorId}
          />
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
