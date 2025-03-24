'use client'

import { getMyInfo } from '@/app/api/user'
import { UserDto } from '@/types/user'
import { useEffect, useRef } from 'react'
import MyChat from '@/app/chats/components/MyChat'
import ChatInform from './ChatInform'
import { ChatDto, IMessage } from '@/app/api/data'
import TeacherChat from './TeacherChat'
import { safeMap } from '@/utils/safeMap'

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // messages가 변경될 때마다 스크롤

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
      {safeMap(messages, (item, idx) => {
        console.log('item', item)
        return item.authorId == myId ? (
          <MyChat
            key={idx}
            {...item}
            user={user}
            isContinued={idx > 0 && messages[idx - 1]?.authorId == myId}
          />
        ) : (
          <TeacherChat
            key={idx}
            {...item}
            chat={chat}
            isContinued={idx > 0 && messages[idx - 1]?.authorId != myId}
          />
        )
      })}
      <div ref={messagesEndRef} /> {/* 스크롤 타겟 요소 */}
    </div>
  )
}
