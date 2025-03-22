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
import {IMessage, ReserveDto} from '@/app/api/data'
import {chatMessages, getChatDetail} from '@/app/api/chat'
import {BASE_WS, basicGet} from '@/api/base'
import { useQuery } from '@tanstack/react-query'
import { endChatByUser } from '@/app/manage/api/homepage'
import moment from 'moment'
import { start } from 'repl'
import useReadPrivateChat from '../hooks/useReadPrivateChat'

const getReserv = (id: number): Promise<ReserveDto> => basicGet(`/reserve/${id}`) as unknown as Promise<ReserveDto>;

export default function PrivateChatPage() {
    const [message, setMessage] = useState<string>('')
    const [myId, setMyId] = useState<string>('')

    const [receivedMessages, setReceivedMessages] = useState<IMessage[]>([])
    const [user, setUser] = useState<UserDto | null>(null)
    const roomId = usePathname().split('/').pop() as string
    const teacherJoined = useRef<boolean>(false);
    const { mutate: readPrivateChat } = useReadPrivateChat(roomId);

    const { data: chat = null, refetch: refetchChat } = useQuery({
        queryKey: ['chat', roomId],
        queryFn: () => getChatDetail(roomId)
    });

    const { data: reserv = null } = useQuery({
        queryKey: ['reserv', roomId],
        queryFn: () => getReserv(chat?.reserveId as number),
        enabled: !!(chat && chat.reserveId)
    });

    const isOutsideReservationTime  = (() => {
        if (!reserv) return true;
        const reservStartTime = moment(reserv.startAt);
        const now = moment();
        return now.isBefore(reservStartTime);
    })();

    const hasReservationEnded = (() => {
        if (!reserv || !reserv.endAt || reserv.status !== 'ACTIVE') return false;
        const reservEndTime = moment(reserv.endAt);
        const now = moment();
        return now.isAfter(reservEndTime);
    })();

    console.log({ reserv, isOutsideReservationTime, hasReservationEnded });

    const client = useRef<StompJs.Client>(null)

    const router = useRouter();


    const handleTimeout = async () => {
        if (isOutsideReservationTime) return;
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
        readPrivateChat();
        initialize()
    }, [])

    useEffect(() => {
        if (!reserv || !reserv.endAt || reserv.status !== 'ACTIVE') return;
        
        const reservEndTime = moment(reserv.endAt);
        const now = moment();
        const timeUntilEnd = reservEndTime.diff(now);
        
        if (timeUntilEnd <= 0) {
            handleReservationEnd();
            return;
        }
        
        const timer = setTimeout(() => {
            handleReservationEnd();
        }, timeUntilEnd);
        
        return () => {
            clearTimeout(timer);
        };
    }, [reserv]);

    const handleReservationEnd = async () => {
        alert("예약된 상담 시간이 종료되었습니다.");
        await endChatByUser(roomId);
        router.back();
    };

    useEffect(() => {
        const deadline = 60 * 1000 * 2;
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
                    console.log({ chatBody: body });

                    if (body.type === 'ERROR') {
                        alert(body.metadata);
                        return;
                    }

                    if (body.type === 'SYSTEM') {
                        const chatStarted = body?.message.includes("시작");
                        const chatEnded = body?.message.includes("종료");
                        const coinNotEnough = body?.metadata?.includes("NOT_ENOUGH_COINS") || undefined; 
                        console.log({ chatEnded });

                        if (chatStarted) {
                            console.log('chat Started!');
                            teacherJoined.current = true;
                            refetchChat();
                        }
            
                        if (coinNotEnough) {
                            alert("코인이 모두 소진되어 채팅이 종료됩니다");
                            router.back();
                            return;
                        }

                        if (chatEnded) {
                            console.log('chat Ended!');
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
                isOutsideReservationTime={isOutsideReservationTime}
            />

            <ChatWriter
                isOutsideReservationTime={isOutsideReservationTime}
                disabled={chat?.status === 'END'}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />
        </div>
    )
}
