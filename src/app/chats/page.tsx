'use client'

import BTB from '@/components/common/Btb'
import MainAppbar from '@/components/common/MainAppbar'
import ChatItem from './components/ChatItem'
import { useState } from 'react'

export default function Chats() {
  const [chats, setChats] = useState<any[]>([])
  return (
    <div>
      <MainAppbar />
      <div className="px-5">
        {chats.map((chat) => {
          return <ChatItem key={chat.id} />
        })}
      </div>
      <BTB />
    </div>
  )
}
