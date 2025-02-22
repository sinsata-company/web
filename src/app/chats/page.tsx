'use client'

import BTB from '@/components/common/Btb'
import MainAppbar from '@/components/common/MainAppbar'
import ChatItem from './components/ChatItem'
import { useEffect, useState } from 'react'
import SuggestLogin from '@/components/common/SuggestLogin'
import { getMyChats } from '../api/chat'
import { CashHistoryDto } from '../api/data'

export default function Chats() {
  const [chats, setChats] = useState<CashHistoryDto[]>([])
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
    <div>
      <MainAppbar />
      <div className="px-5">
        {!isLogin && <SuggestLogin label="채팅을 하기" />}
        {chats.map((chat, idx) => {
          return <ChatItem key={'chat-' + idx} {...chat} />
        })}
      </div>
      <BTB />
    </div>
  )
}
