'use client'

import CategoryContainer from '@/app/home/components/CategoryContainer'
import BackAppbar from '@/components/common/BackAppbar'
import ChatWriter from '../../components/ChatWriter'
import { useEffect, useRef, useState } from 'react'
import * as StompJs from '@stomp/stompjs'
import { usePathname, useRouter } from 'next/navigation'
import ChatScreen from './components/ChatScreen'
import { v4 as uuidv4 } from 'uuid'
import { UserDto } from '@/types/user'
import { getMyInfo } from '@/app/api/user'

export interface IMessage {
  roomId: string
  authorId: string
  message: string
  id: number
  createdAt: string
  level: string
  nickname: string
}

export default function GroupChat() {
  const [message, setMessage] = useState<string>('')
  const [myId, setMyId] = useState<string>('')
  const client = useRef<StompJs.Client>(null)
  const category = usePathname().split('/').pop() as string
  const [receivedMessages, setReceivedMessages] = useState<IMessage[]>([])
  const [user, setUser] = useState<UserDto | null>(null)

  useEffect(() => {
    getUserDetails()
  }, [])

  const getUserDetails = async () => {
    const user = await getMyInfo()
    setUser(user)
  }

  const router = useRouter()

  const sendMessage = () => {
    if (message.trim().length < 1) return

    if (client.current) {
      client.current?.publish({
        destination: `/pub/message/group`,
        body: JSON.stringify({
          roomId: category,
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
        `/sub/channel/${category}`,
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
        // brokerURL: 'ws://localhost:8080/chat/inbox',
        // brokerURL: 'ws://15.165.5.202:8080/chat/inbox',
        brokerURL: 'wss://api.sinsata.co.kr/chat/inbox',
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

  return (
    <div className="w-full h-full relative">
      <BackAppbar />
      <CategoryContainer
        onClick={(image: string) => {
          router.push('/chats/group/' + image)
        }}
      />

      <ChatScreen user={user} messages={receivedMessages} myId={myId} />

      <ChatWriter
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  )
}
