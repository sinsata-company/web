'use client'

import CategoryContainer from '@/app/home/components/CategoryContainer'
import BackAppbar from '@/components/common/BackAppbar'
import {useEffect, useRef, useState} from 'react'
import * as StompJs from '@stomp/stompjs'
import {usePathname, useRouter} from 'next/navigation'
import {v4 as uuidv4} from 'uuid'
import {UserDto} from '@/types/user'
import {getMyInfo} from '@/app/api/user'
import {ChatDto, IMessage} from '@/app/api/data'
import {chatMessages, getChatDetail} from '@/app/api/chat'
import ChatWriter from '@/app/chats/components/ChatWriter'
import PrivateChatScreen from '@/app/chats/private/[id]/components/PrivateChatScreen'
import ChatSummary from '@/app/chats/private/[id]/components/ChatSummary'
import UserSummary from './components/UserSummary'
import {Button, BUTTON_TYPE} from '@/components/common/Button'
import {startChat} from '@/app/manage/api/homepage'
import {BASE_WS} from '@/api/base'
import {useQuery} from '@tanstack/react-query'
import { ChatStatus } from '@/types/reservation'

export default function Page() {
    const [message, setMessage] = useState<string>('')
    const [myId, setMyId] = useState<string>('')

    const [receivedMessages, setReceivedMessages] = useState<IMessage[]>([])
    const [user, setUser] = useState<UserDto | null>(null)
    const roomId = usePathname().split('/').pop() as string
    const { data: chat = null, refetch: refetchChat } = useQuery({
        queryKey: ['chat', roomId],
        queryFn: () => getChatDetail(roomId)
    })

    const client = useRef<StompJs.Client>(null)
    const router = useRouter()

    useEffect(() => {
        initialize()
    }, [])

    const initialize = async () => {
        const user = await getMyInfo()
        const prevMessages = await chatMessages(roomId);
        console.log('user', user);
        setUser(user)
        setMyId(user.userId);
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

            console.log(`> Send message: ${message}`)
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
                    console.log({ body });

                    if (body.type === 'ERROR') {
                        alert(body.message);
                        return;
                    }

                    if (body.type === 'SYSTEM') {
                        const chatStarted = body.message.includes("시작");
                        const chatEnded = body.message.includes("종료");

                        if (chatStarted) {
                            refetchChat();
                        }

                        if (chatEnded) {
                            alert("상담이 종료되었습니다.");
                            router.back();
                        }
                        return;
                    }

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
            console.log('Activating...')
            client.current.activate()
        }
        connect()
    }, [])

    // 해야될 것. 채팅 시작되지 않았을 때, 채팅 종료되었을 때 타이핑 막기 & 안내 문구 띄우기
    //
    return (
        <div className="w-full h-full relative">
            <UserSummary chat={chat} sendEndMessage={sendEndMessage}/>
            <PrivateChatScreen
                chat={chat}
                user={user}
                messages={receivedMessages}
                myId={myId}
            />
            <ChatWriter
                disabled={chat?.status == ChatStatus.REQUEST || chat?.status == ChatStatus.END}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                actionButton={
                    chat?.status == ChatStatus.END ? (
                        <Button
                            label="메모 남기기"
                            onClick={async () => {
                                // 채팅 수락
                                router.push('/manage/app/reserves/' + chat?.reserveId)
                            }}
                            buttonType={BUTTON_TYPE.primary}
                        />
                    ) : chat?.status == 'REQUEST' ? (
                        <Button
                            label="채팅 수락"
                            onClick={async () => {
                                // 채팅 수락
                                await startChat(chat.roomId)
                                initialize()
                            }}
                            buttonType={BUTTON_TYPE.primary}
                        />
                    ) : null
                }
            />
            {/* 채팅 안내 관련 모달 */}
        </div>
    )
}
