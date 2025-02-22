'use client'

import CategoryContainer from '@/app/home/components/CategoryContainer'
import BackAppbar from '@/components/common/BackAppbar'
import { useEffect, useRef, useState } from 'react'
import * as StompJs from '@stomp/stompjs'
import { usePathname, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { UserDto } from '@/types/user'
import { getMyInfo } from '@/app/api/user'
import { ChatDto, IMessage } from '@/app/api/data'
import { getChatDetail } from '@/app/api/chat'
import ChatWriter from '@/app/chats/components/ChatWriter'
import PrivateChatScreen from '@/app/chats/private/[id]/components/PrivateChatScreen'
import ChatSummary from '@/app/chats/private/[id]/components/ChatSummary'
import UserSummary from './components/UserSummary'

export default function Page() {
  const [message, setMessage] = useState<string>('')
  const [myId, setMyId] = useState<string>('')

  const [receivedMessages, setReceivedMessages] = useState<IMessage[]>([])
  const [user, setUser] = useState<UserDto | null>(null)
  const [chat, setChat] = useState<ChatDto | null>(null)

  const client = useRef<StompJs.Client>(null)
  const roomId = usePathname().split('/').pop() as string

  useEffect(() => {
    initialize()
  }, [])

  const initialize = async () => {
    const user = await getMyInfo()
    const chat = await getChatDetail(roomId)
    setUser(user)
    setChat(chat)
  }

  const sendMessage = () => {
    if (message.trim().length < 1) return

    if (client.current) {
      client.current?.publish({
        destination: `/pub/message/group`,
        body: JSON.stringify({
          roomId: roomId,
          authorId: myId,
          message: message,
          level: user?.level,
          nickname: user?.nickname,
        }),
      })

      console.log(`> Send message: ${message}`)
    }
    setMessage('')
  }

  useEffect(() => {
    const uuid = uuidv4()
    setMyId(uuid)

    const disconnect = () => {
      client.current?.deactivate()
      console.log('Disconnected')
    }

    const subscribe = () => {
      console.log('Subscribing...')
      client.current?.subscribe(
        `/sub/channel/${roomId}`,
        (received_message: StompJs.IFrame) => {
          const body = JSON.parse(received_message.body)
          // receivedMessages.push()
          setReceivedMessages((prevMessages) => [...prevMessages, body]) // 기존 메시지에 추가

          console.log(`> Received message: ${received_message.body}`)
        }
      )
    }

    const subscribeError = () => {
      console.log('Subscribing Error...')
      client.current?.subscribe(
        '/user/queue/errors',
        (received_message: StompJs.IFrame) => {
          console.log(`> Received message: ${received_message.body}`)
        }
      )
    }

    const connect = () => {
      console.log('Connecting...')
      client.current = new StompJs.Client({
        brokerURL: 'ws://localhost:8080/chat/inbox',
        // brokerURL: 'ws://15.165.5.202:8080/chat/inbox',
        // brokerURL: 'wss://api.sinsata.co.kr/chat/inbox',
        reconnectDelay: 200,
        onConnect: () => {
          console.log('connected')
          subscribeError()
          subscribe()
        },
        onWebSocketError: (error) => {
          console.log('Error with websocket', error)
        },
        onStompError: (frame) => {
          console.dir(`Broker reported error: ${frame.headers.message}`)
          console.dir(`Additional details: ${frame}`)
        },
      })
      console.log('Activating...')
      client.current.activate()
    }
    connect()
  }, [])

  // 해야될 것. 채팅 시작되지 않았을 때, 채팅 종료되었을 때 타이핑 막기 & 안내 문구 띄우기
  //
  return (
    <div className="w-full h-full relative">
      <UserSummary chat={chat} />

      <PrivateChatScreen
        chat={chat}
        user={user}
        messages={receivedMessages}
        myId={myId}
      />

      <ChatWriter
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  )
}
