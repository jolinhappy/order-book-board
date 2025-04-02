import { useCallback, useState } from 'react';
import useWebSocket from './useWebsocket';
import { PriceInfo, PriceInfoResponse } from '@/types/order';

const useLastPriceInfo = () => {
  const [lastPriceInfo, setLastPriceInfo] = useState<PriceInfo | null>(null);

  const handleMessage = useCallback((data: PriceInfoResponse) => {
    if (!data || !data.data || data.data.length === 0) return;
    setLastPriceInfo(data.data[0]);
  }, []);

  useWebSocket({
    url: 'wss://ws.btse.com/ws/futures',
    topic: 'tradeHistoryApi:BTCPFC',
    onMessage: handleMessage,
  });

  return lastPriceInfo;
};

export default useLastPriceInfo;
