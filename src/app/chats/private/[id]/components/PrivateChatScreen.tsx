'use client'

import { getMyInfo } from '@/app/api/user'

import { UserDto } from '@/types/user'
import { useEffect, useState } from 'react'
import MyChat from '@/app/chats/components/MyChat'

import ChatInform from './ChatInform'
import { IMessage } from '@/app/api/data'

export default function PrivateChatScreen({
  messages,
  myId,
  user,
}: {
  messages: IMessage[]
  myId: string
  user: UserDto | null
}) {
  return (
    <div
      style={{
        marginTop: 15,
        height: 'calc(100vh - 120px)',
      }}
      className="inline-flex flex-col py-5 px-5 gap-2.5 w-full overflow-y-auto "
    >
      <ChatInform />
      {messages.map((item, idx) => {
        return item.authorId == myId ? (
          <MyChat
            key={idx}
            {...item}
            user={user}
            isContinued={idx > 0 && messages[idx - 1].authorId == myId}
          />
        ) : (
          <OthersChat
            key={idx}
            {...item}
            isContinued={idx > 0 && messages[idx - 1].authorId != myId}
          />
        )
      })}
    </div>
  )
}
