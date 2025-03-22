'use client'

import BackAppbar from '@/components/common/BackAppbar'
import ChatWriter from '../../components/ChatWriter'
import {useEffect, useRef, useState} from 'react'
import * as StompJs from '@stomp/stompjs'
import {usePathname, useRouter} from 'next/navigation'
import {UserDto} from '@/types/user'
import {getMyInfo} from '@/app/api/user'
import ChatSummary from './components/ChatSummary'
import PrivateChatScreen from './components/PrivateChatScreen'
import {IMessage} from '@/app/api/data'
import {chatMessages, getChatDetail} from '@/app/api/chat'
import {BASE_WS} from '@/api/base'
import { useQuery } from '@tanstack/react-query'
import { endChatByUser } from '@/app/manage/api/homepage'

export default function PrivateChatPage() {
    const [message, setMessage] = useState<string>('')
    const [myId, setMyId] = useState<string>('')

    const [receivedMessages, setReceivedMessages] = useState<IMessage[]>([])
    const [user, setUser] = useState<UserDto | null>(null)
    const roomId = usePathname().split('/').pop() as string
    const teacherJoined = useRef<boolean>(false);

    const { data: chat = null, refetch: refetchChat } = useQuery({
        queryKey: ['chat', roomId],
        queryFn: () => getChatDetail(roomId)
    })

    const client = useRef<StompJs.Client>(null)

    const router = useRouter();


    const handleTimeout = async () => {
        if (teacherJoined.current) return;
        await endChatByUser(roomId);
        alert("죄송합니다 고객님\n선생님과의 연결이 원활하지 않습니다.");
        router.back();
    };

    const initialize = async () => {
        const user = await getMyInfo();
        const prevMessages = await chatMessages(roomId);
        setUser(user)
        setMyId(user.userId);
        setReceivedMessages(prevMessages as Array<IMessage>);
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
        initialize()
    }, [])

    useEffect(() => {
        const deadline = 60 * 1000 * 2
        const timer = setTimeout(() => {
            handleTimeout();
        }, deadline);
        
        return () => {
            clearTimeout(timer)
        }
    }, [])

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
                    const body = JSON.parse(received_message.body);

                    if (!!body?.isEnd) {
                        initialize();
                        return;
                    }

                    if (body.type === 'ERROR') {
                        alert(body.metadata);
                        return;
                    }

                    if (body.type === 'SYSTEM') {
                        const chatStarted = body.message.includes("시작");
                        const chatEnded = body.message.includes("종료");

                        if (chatStarted) {
                            teacherJoined.current = true;
                            refetchChat();
                        }

                        if (chatEnded) {
                            initialize();
                            alert("상담이 종료되었습니다.");
                            router.back();
                        }
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

    return (
        <div className="w-full h-full relative">
            <BackAppbar/>
            <ChatSummary chat={chat} sendEndMessage={sendEndMessage}/>

            <PrivateChatScreen
                chat={chat}
                user={user}
                messages={receivedMessages}
                myId={myId}
            />

            <ChatWriter
                disabled={chat?.status === 'END'}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />
        </div>
    )
}
