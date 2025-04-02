import { useState } from 'react';
import useWebSocket from './useWebsocket';
import { PriceInfo } from '@/types/order';

const useLastPriceInfo = () => {
  const [lastPriceInfo, setLastPriceInfo] = useState<PriceInfo | null>(null);

  useWebSocket({
    url: 'wss://ws.btse.com/ws/futures',
    topic: 'tradeHistoryApi:BTCPFC',
    onMessage: (data) => {
      if (!data || !data.data || data.data.length === 0) return;
      setLastPriceInfo(data.data[0]);
    },
  });

  return lastPriceInfo;
};

export default useLastPriceInfo;
