import { useEffect, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

type MessageHandler = (data: any, reconnect: () => void) => void;

interface UseWebSocketParams {
  url: string;
  topic: string;
  onMessage: MessageHandler;
}

const useWebSocket = ({ url, topic, onMessage }: UseWebSocketParams) => {
  const socketRef = useRef<ReconnectingWebSocket | null>(null);

  const reconnect = () => {
    if (socketRef.current) {
      console.warn('WebSocket 正在重連...');
      socketRef.current.close();
    }
  };

  useEffect(() => {
    const ws = new ReconnectingWebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log(`Connected to ${url}`);
      ws.send(JSON.stringify({ op: 'subscribe', args: [topic] }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data, reconnect);
    };

    ws.onerror = (err) => {
      console.error(`WebSocket error (${url}):`, err);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ op: 'unsubscribe', args: [topic] }));
      }
      ws.close();
    };
  }, [url, topic, onMessage]);
};

export default useWebSocket;
