'use client'

import { useEffect, useRef, useState } from 'react'
import * as StompJs from '@stomp/stompjs'
import { v4 as uuidv4 } from 'uuid'
import { getMyInfo } from '@/app/api/user'
import { UserDto } from '@/types/user'
import { BASE_WS } from '@/api/base'
import { ProductInquiryMessage, ChatDto } from '@/app/api/data'
import BackAppbar from '@/components/common/BackAppbar'
import ChatWriter from '@/app/chats/components/ChatWriter'
import PrivateChatScreen from '@/app/chats/inquiry/[id]/product/components/PrivateChatScreen'
export default function TeacherProductInquiryChat() {
  const [message, setMessage] = useState<string>('')
  const [myId, setMyId] = useState<string>('')
  const client = useRef<StompJs.Client>(null)
  const [messages, setMessages] = useState<ProductInquiryMessage[]>([])
  const [user, setUser] = useState<UserDto | null>(null)
  const [chat, setChat] = useState<ChatDto | null>(null)

  useEffect(() => {
    getUserDetails()
    const uuid = uuidv4()
    setMyId(uuid)
  }, [])

  const getUserDetails = async () => {
    const user = await getMyInfo()
    setUser(user)
  }

  const sendMessage = () => {
    if (message.trim().length < 1) return

    if (client.current) {
      client.current?.publish({
        destination: `/pub/message/product/teacher`,
        body: JSON.stringify({
          authorId: myId,
          message: message,
          isTeacher: true,
          nickname: user?.nickname,
          createdAt: new Date().toISOString(),
        }),
      })
    }
    setMessage('')
  }

  useEffect(() => {
    const connect = () => {
      client.current = new StompJs.Client({
        brokerURL: BASE_WS,
        reconnectDelay: 200,
        onConnect: () => {
          // 상담사는 모든 상품 문의를 구독
          client.current?.subscribe(
            `/sub/product/all`,
            (received_message: StompJs.IFrame) => {
              const body = JSON.parse(received_message.body)
              setMessages((prevMessages) => [...prevMessages, body])
            }
          )
        },
      })
      client.current.activate()
    }

    connect()
    return () => {
      client.current?.deactivate()
    }
  }, [])

  return (
    <div className="w-full h-full relative">
      <BackAppbar />
      <PrivateChatScreen 
        messages={messages} 
        myId={myId} 
        user={user}
        chat={chat}
      />
      <ChatWriter
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  )
} 