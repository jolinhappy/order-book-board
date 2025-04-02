import { OrderData, OrderDataResponse } from '@/types/order';
import { useCallback, useState } from 'react';
import useWebSocket from './useWebsocket';

const useOrderData = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const handleMessage = useCallback((data: OrderDataResponse, reconnect: () => void) => {
    if (!data || !data.data) return;
    if (data.data.seqNum - 1 !== data.data.prevSeqNum) {
      // 序號不連續，重新訂閱
      reconnect();
      return;
    }
    setOrderData(data.data);
  }, []);

  useWebSocket({
    url: 'wss://ws.btse.com/ws/oss/futures',
    topic: 'update:BTCPFC_0',
    onMessage: handleMessage,
  });

  return orderData;
};

export default useOrderData;
