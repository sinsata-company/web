'use client'

import BTB from '@/components/common/Btb'
import MainAppbar from '@/components/common/MainAppbar'
import ChatItem from './components/ChatItem'
import { useEffect, useState } from 'react'
import SuggestLogin from '@/components/common/SuggestLogin'

export default function Chats() {
  const [chats, setChats] = useState<any[]>([])
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('sst-access-token')
    if (!token) {
      setIsLogin(false)
    }
  }, [])

  return (
    <div>
      <MainAppbar />
      <div className="px-5">
        {!isLogin && <SuggestLogin label="채팅을 하기" />}
        {chats.map((chat) => {
          return <ChatItem key={chat.id} />
        })}
      </div>
      <BTB />
    </div>
  )
}
