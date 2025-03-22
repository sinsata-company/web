'use client'

import { getMyInfo } from '@/app/api/user'

import { UserDto } from '@/types/user'
import { useEffect, useState, useRef } from 'react'
import MyChat from '@/app/chats/components/MyChat'

import ChatInform from './ChatInform'
import { ChatDto, IMessage } from '@/app/api/data'
import TeacherChat from './TeacherChat'

export default function PrivateChatScreen({
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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

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
      <ChatInform chat={chat} />
      {messages.map((item, idx) => {
        return item.authorId == myId ? (
          <MyChat
            key={idx}
            {...item}
            user={user}
            isContinued={idx > 0 && messages[idx - 1].authorId == myId}
          />
        ) : (
          <TeacherChat
            key={idx}
            {...item}
            chat={chat}
            isContinued={idx > 0 && messages[idx - 1].authorId != myId}
          />
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
