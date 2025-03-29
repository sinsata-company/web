'use client'

import {useEffect, useRef, useState} from 'react'
import * as StompJs from '@stomp/stompjs'
import {usePathname} from 'next/navigation'
import {getMyInfoByTeacher} from '@/app/api/user'
import { IMessage } from '@/app/api/data'
import {chatMessages, getChatDetail} from '@/app/api/chat'
import ChatWriter from '@/app/chats/components/ChatWriter'
import PrivateChatScreen from '@/app/chats/private/[id]/components/PrivateChatScreen'
import UserSummary from './components/UserSummary'
import {BASE_WS} from '@/api/base'
import {useQuery} from '@tanstack/react-query'
import useReadPrivateChat from '@/app/chats/private/hooks/useReadPrivateChat'

export default function Page() {
    const [message, setMessage] = useState<string>('')
    const [myId, setMyId] = useState<string>('')
    const [receivedMessages, setReceivedMessages] = useState<IMessage[]>([])
    const roomId = usePathname().split('/').pop() as string
    const { mutate: readPrivateChat } = useReadPrivateChat(roomId, true);

    const { data: user = null } = useQuery({
        queryKey: ['me'],
        queryFn: getMyInfoByTeacher,
    });
    const { data: chat = null } = useQuery({
        queryKey: ['chat', roomId],
        queryFn: () => getChatDetail(roomId)
    });

    const client = useRef<StompJs.Client>(null)

    useEffect(() => {
        initialize()
        readPrivateChat();
    }, [])

    const initialize = async () => {
        const prevMessages = await chatMessages(roomId);
        setMyId(user?.userId || '');
        setReceivedMessages(prevMessages as Array<IMessage>)
    }

    const sendMessage = () => {
        if (message.trim().length < 1) return

        if (client.current) {
            const bodyData = {
                isTeacher: true,
                roomId: roomId,
                authorId: myId,
                type: 'INQUIRY',
                message: message,
                level: user?.level,
                nickname: `선생님 ${user?.nickname}`,
            };
            client.current?.publish({
                destination: `/pub/message/group`,
                headers: {
                    userId: myId
                },
                body: JSON.stringify(bodyData),
            });
        }
        setMessage('')
    }

    useEffect(() => {
        if (!user?.userId) return;
        const disconnect = () => {
            client.current?.deactivate()
            console.log('Disconnected')
        }

        const subscribe = () => {
            console.log('Subscribing...')
            client.current?.subscribe(
                `/sub/channel/${roomId}`,
                (received_message: StompJs.IFrame) => {
                    readPrivateChat();
                    const body = JSON.parse(received_message.body)
                    const ignore = (() => {
                        if (body?.metadata?.includes('채팅이 아직 수락되지 않았습니다.')) return true;
                        return false;
                    })()

                    console.log({ body, ignore });
                    if (ignore) return;

                    if (body.type === 'ERROR') {
                        alert(body.message);
                        return;
                    }

                    setReceivedMessages((prevMessages) => [...prevMessages, body])
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

        console.log({ webConnectUserId: user?.userId })

        const connect = () => {
            console.log('Connecting...')
            client.current = new StompJs.Client({
                brokerURL: BASE_WS,
                connectHeaders: {
                    userId: user?.userId,
                },
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

        return () => {
            readPrivateChat();
            disconnect();
        }
    }, [user]);

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
