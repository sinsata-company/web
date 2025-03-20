'use client'

import BackAppbar from '@/components/common/BackAppbar'
import {useEffect, useRef, useState} from 'react'
import * as StompJs from '@stomp/stompjs'
import {useParams, usePathname, useRouter} from 'next/navigation'
import {UserDto} from '@/types/user'
import {getMyInfo} from '@/app/api/user'
import {ChatDto, IMessage, TeacherDetailDto} from '@/app/api/data'
import {chatMessages, getChatDetail} from '@/app/api/chat'
import ChatWriter from '@/app/chats/components/ChatWriter'
import PrivateChatScreen from '@/app/chats/inquiry/[id]/product/components/PrivateChatScreen'
import ChatSummary from '@/app/chats/inquiry/[id]/product/components/ChatSummary'
import {Button, BUTTON_TYPE} from '@/components/common/Button'
import {startChat} from '@/app/manage/api/homepage'
import {BASE_WS} from '@/api/base'

export default function TeacherChatPage() {
    const [message, setMessage] = useState<string>('')
    const [myId, setMyId] = useState<string>('')
    const [receivedMessages, setReceivedMessages] = useState<IMessage[]>([])
    const [user, setUser] = useState<UserDto | null>(null)
    const [chat, setChat] = useState<ChatDto | null>(null)

    const client = useRef<StompJs.Client>(null)
    const roomId = usePathname().split('/').pop() as string
    const router = useRouter()

    useEffect(() => {
        initialize()
    }, [])

    const initialize = async () => {
        const user = await getMyInfo()
        const chat = await getChatDetail(roomId)
        const prevMessages = await chatMessages(roomId);
        
        // 선생님 권한 체크
        // if (user.role !== 'TEACHER') {
        //     router.push('/') // 또는 적절한 에러 페이지로 리다이렉트
        //     return
        // }
        
        setUser(user)
        setChat(chat)
        setMyId(user.userId)
        setReceivedMessages(prevMessages as Array<IMessage>)
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
                    isTeacher: true, // 선생님 메시지임을 표시
                }),
            })
            console.log(`> Send message: ${message}`)
        }
        setMessage('')
    }

    const sendEndMessage = () => {
        if (client.current) {
            client.current?.publish({
                destination: `/pub/message/group/end`,
                body: JSON.stringify({
                    roomId: roomId,
                    authorId: myId,
                    nickname: user?.nickname,
                    isEnd: true
                }),
            })
        }
        setMessage('')
    }

    useEffect(() => {
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

                    if (!!body?.isEnd) {
                        console.log('finish...');
                        router.refresh();
                        return;
                    }

                    setReceivedMessages((prevMessages) => [...prevMessages, body])
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
            client.current = new StompJs.Client({
                brokerURL: BASE_WS,
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
            client.current.activate()
        }
        connect()

        return () => {
            disconnect()
        }
    }, [])

    return (
        <div className="w-full h-full relative">
            <BackAppbar/>
            <ChatSummary 
                chat={chat} 
                sendEndMessage={sendEndMessage}
            />
            <PrivateChatScreen
                chat={chat}
                user={user}
                messages={receivedMessages}
                myId={myId}
            />
            <ChatWriter
                disabled={chat?.status == 'REQUEST' || chat?.status == 'END'}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                actionButton={
                    chat?.status == 'END' ? (
                        <Button
                            label="상담 기록 보기"
                            onClick={() => {
                                router.push('/teacher/consults/' + chat?.reserveId)
                            }}
                            buttonType={BUTTON_TYPE.primary}
                        />
                    ) : chat?.status == 'REQUEST' ? (
                        <Button
                            label="채팅 시작하기"
                            onClick={async () => {
                                await startChat(chat.roomId)
                                initialize()
                            }}
                            buttonType={BUTTON_TYPE.primary}
                        />
                    ) : null
                }
            />
        </div>
    )
}