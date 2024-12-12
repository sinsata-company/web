import * as StompJs from '@stomp/stompjs'
import { useRef } from 'react'

const client = useRef<StompJs.Client>()

const connect = () => {
  console.log('Connecting...')
  client.current = new StompJs.Client({
    brokerURL: 'ws://웹소켓 서버 BASE_URL/ws',
    connectHeaders: {
      Authorization: `Bearer ${tokenManager.getToken()}`,
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
