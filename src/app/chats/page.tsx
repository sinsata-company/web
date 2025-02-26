'use client'

import BTB from '@/components/common/Btb'
import MainAppbar from '@/components/common/MainAppbar'
import ChatItem from './components/ChatItem'
import { useEffect, useState } from 'react'
import SuggestLogin from '@/components/common/SuggestLogin'
import { getMyChats } from '../api/chat'
import { CashHistoryDto, ChatDto } from '../api/data'

export default function Chats() {
  const [chats, setChats] = useState<ChatDto[]>([])
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('sst-access-token')
    if (!token) {
      setIsLogin(false)
    }
    getMyChats()
      .then((res) => {
        setChats(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="h-screen">
      <MainAppbar />
      <div className="px-5 py-5 bg-amber-50">
        {!isLogin && <SuggestLogin label="채팅을 하기" />}
        <div className="flex flex-col gap-4 ">
          {chats.map((chat, idx) => {
            return <ChatItem key={'chat-' + idx} {...chat} />
          })}
        </div>
        <div className="h-36"></div>
      </div>

      <BTB />
    </div>
  )
}
