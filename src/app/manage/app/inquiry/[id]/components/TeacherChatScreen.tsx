'use client'

import { getMyInfo } from '@/app/api/user'

import { UserDto } from '@/types/user'
import { useEffect, useState } from 'react'
import MyChat from '@/app/chats/components/MyChat'

import { ChatDto, IMessage } from '@/app/api/data'
import TeacherChat from '@/app/chats/private/[id]/components/TeacherChat'

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
  return (
    <div
      style={{
        marginTop: 15,
        height: 'calc(100vh - 120px)',
      }}
      className="inline-flex flex-col py-5 px-5 gap-2.5 w-full overflow-y-auto "
    >
      {messages.map((item, idx) => {
        return item.authorId == myId ? (
          <MyChat
            key={idx}
            {...item}
            user={user}
            isTeacher={true}
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
    </div>
  )
}
