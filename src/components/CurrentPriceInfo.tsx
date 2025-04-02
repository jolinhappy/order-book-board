import useLastPriceInfo from '@/hooks/useLastPriceInfo';
import { useEffect, useRef, useState } from 'react';
import { TiArrowUpThick, TiArrowDownThick } from 'react-icons/ti';
import formateNumber from '@/utils/formateNumber';
import { PriceChangeStatus } from '@/types/order';
import bn from 'bignumber.js';
import { cn } from '@/utils/cn';

const colorMapping = {
  [PriceChangeStatus.UP]: {
    text: 'text-green',
    background: 'bg-green-012',
  },
  [PriceChangeStatus.DOWN]: {
    text: 'text-red',
    background: 'bg-red-012',
  },
  [PriceChangeStatus.SAME]: {
    text: 'text-gray-light',
    background: 'bg-gray-012',
  },
};

const CurrentPriceInfo = () => {
  const previousPrice = useRef<string | null>(null);
  const [currentPriceStatus, setCurrentPriceStatus] = useState<PriceChangeStatus>(PriceChangeStatus.SAME);
  const lastPriceInfo = useLastPriceInfo();
  const currentPrice = lastPriceInfo?.price;

  const renderIcon = () => {
    switch (currentPriceStatus) {
      case PriceChangeStatus.UP:
        return <TiArrowUpThick className="text-green ml-1" />;
      case PriceChangeStatus.DOWN:
        return <TiArrowDownThick className="text-red ml-1" />;
      default:
        return;
    }
  };

  useEffect(() => {
    const getPriceChangeStatus = () => {
      if (!currentPrice || !previousPrice.current) return PriceChangeStatus.SAME;
      if (bn(currentPrice).isGreaterThan(bn(previousPrice.current))) return PriceChangeStatus.UP;
      if (bn(currentPrice).isLessThan(bn(previousPrice.current))) return PriceChangeStatus.DOWN;
      return PriceChangeStatus.SAME;
    };
    if (!lastPriceInfo || !currentPrice) return;
    const priceChangeStatus = getPriceChangeStatus();
    setCurrentPriceStatus(priceChangeStatus);
    if (!previousPrice.current || !bn(currentPrice).isEqualTo(bn(previousPrice.current))) {
      previousPrice.current = currentPrice;
    }
  }, [currentPrice, lastPriceInfo]);

  return (
    <div
      className={cn('w-full h-7 justify-center items-center flex my-1', colorMapping[currentPriceStatus].background)}
    >
      <p className={cn('text-base font-bold', colorMapping[currentPriceStatus].text)}>
        {currentPrice ? formateNumber({ price: currentPrice, decimalPlaces: 1 }) : '--'}
      </p>
      {renderIcon()}
    </div>
  );
};

export default CurrentPriceInfo;
