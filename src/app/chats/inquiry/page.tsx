'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getMyInfo } from '@/app/api/user'
import { ChatDto, IMessage } from '@/app/api/data'
import { createInquiryChat, chatMessages } from '@/app/api/chat'
import ChatWriter from '@/app/chats/components/ChatWriter'
import { BASE_WS } from '@/api/base'
import { UserDto } from '@/types/user'

export default function InquiryPage() {
    // const [message, setMessage] = useState<string>('')
    // const [myId, setMyId] = useState<string>('')
    // const [receivedMessages, setReceivedMessages] = useState<IMessage[]>([])
    // const [user, setUser] = useState<UserDto | null>(null)
    // const [chat, setChat] = useState<ChatDto | null>(null)
    // const client = useRef<any>(null)
    // const router = useRouter()

    // useEffect(() => {
    //     const initializeWebSocket = async () => {
    //         const { Client } = await import('@stomp/stompjs')
    //         client.current = new Client({
    //             brokerURL: BASE_WS,
    //             onConnect: () => {
    //                 console.log('Connected to WebSocket')
    //             },
    //             onDisconnect: () => {
    //                 console.log('Disconnected from WebSocket')
    //             }
    //         })
            
    //         initialize()
    //     }

    //     initializeWebSocket()

    //     return () => {
    //         client.current?.deactivate()
    //     }
    // }, [])

    // useEffect(() => {
    //     initialize()
    // }, [])

    // const initialize = async () => {
    //     const user = await getMyInfo()
    //     setUser(user)
    //     setMyId(user.userId)
        
    //     // 새로운 문의 채팅방 생성
    //     const newChat = await createInquiryChat()
    //     setChat(newChat)
        
    //     if (newChat.roomId) {
    //         const prevMessages = await chatMessages(newChat.roomId)
    //         setReceivedMessages(prevMessages as IMessage[])
    //     }
    // }

    // const sendMessage = async () => {
    //     if (!message.trim() || !chat?.roomId) return;
        
    //     try {
    //         client.current?.publish({
    //             destination: `/pub/chat.message.${chat.roomId}`,
    //             body: JSON.stringify({
    //                 type: 'TALK',
    //                 roomId: chat.roomId,
    //                 senderId: myId,
    //                 content: message
    //             })
    //         });
    //         setMessage('');
    //     } catch (error) {
    //         console.error('Failed to send message:', error);
    //     }
    // };

    // // WebSocket 연결 및 메시지 송수신 로직은 기존 코드와 동일
    // // ... (기존 WebSocket 관련 코드)

    // return (
    //     <div className="w-full h-full relative">
    //         {/* <PrivateChatScreen
    //             chat={chat}
    //             user={user}
    //             messages={receivedMessages}
    //             myId={myId}
    //         /> */}
    //         <ChatWriter
    //             disabled={chat?.status === 'END'}
    //             message={message}
    //             setMessage={setMessage}
    //             sendMessage={sendMessage}   
    //         />
    //     </div>
    // )
} 