import { useEffect, useRef } from 'react';
import * as StompJs from '@stomp/stompjs';
import { BASE_WS } from '@/api/base';

type MessageHandler<T> = (message: T) => void;

interface UseWebSocketOptions<T> {
  channelUrl: string;
  errorUrl?: string;
  onMessage?: MessageHandler<T>;
  enabled?: boolean;
}

export function useWebSocket<T>({
  channelUrl,
  errorUrl = '/user/queue/errors',
  onMessage,
  connectHeaders,
  enabled = true
}: UseWebSocketOptions<T>) {
  const client = useRef<StompJs.Client | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const disconnect = () => {
      client.current?.deactivate();
      console.log('WebSocket disconnected');
    };

    const subscribe = () => {
      console.log(`Subscribing to ${channelUrl}...`);
      client.current?.subscribe(
        channelUrl,
        (receivedMessage: StompJs.IFrame) => {
          if (onMessage) {
            try {
              const body = JSON.parse(receivedMessage.body);
              onMessage(body);
            } catch (error) {
              console.error('Error parsing message:', error);
            }
          }
        }
      );
    };

    const subscribeError = () => {
      if (errorUrl) {
        console.log(`Subscribing to error channel ${errorUrl}...`);
        client.current?.subscribe(
          errorUrl,
          (receivedMessage: StompJs.IFrame) => {
            console.log(`Error received: ${receivedMessage.body}`);
          }
        );
      }
    };  

    const connect = () => {
      console.log('Connecting to WebSocket...');
      client.current = new StompJs.Client({
        brokerURL: BASE_WS,
        connectHeaders,
        reconnectDelay: 200,
        onConnect: () => {
          console.log('WebSocket connected');
          subscribeError();
          subscribe();
        },
        onWebSocketError: (error) => {
          console.log('WebSocket error:', error);
        },
        onStompError: (frame) => {
          console.log(`Broker reported error: ${frame.headers.message}`);
          console.log(`Additional details:`, frame);
        },
      });
      
      client.current.activate();
    };

    connect();

    return () => {
      disconnect();
    };
  }, [channelUrl, errorUrl, onMessage, connectHeaders, enabled]);

  return { client };
}
