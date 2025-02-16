'use client'

import { getMyInfo } from '@/app/api/user'
import { IMessage } from '../page'
import MyChat from './MyChat'
import OthersChat from './OthersChat'
import { UserDto } from '@/types/user'
import { useEffect, useState } from 'react'

export default function ChatScreen({
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
