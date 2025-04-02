import { OrderBookDataItem, PriceChangeStatus, QuoteType } from '@/types/order';
import formateNumber from '@/utils/formateNumber';
import { cn } from '@/utils/cn';
import useOrderData from '@/hooks/useOrderData';
import { useEffect, useRef, useState } from 'react';
import transformOrderData from '@/utils/transformOrderData';
import bn from 'bignumber.js';

const QuotesInfo = ({ type }: { type: QuoteType }) => {
  const orderData = useOrderData();
  const targetDataCount = 8;
  const [orderRows, setOrderRows] = useState<OrderBookDataItem[]>([]);
  const [maxQuantity, setMaxQuantity] = useState<string>('0');

  const previousData = useRef<OrderBookDataItem[] | null>(null);

  const quantityBackgroundColorMapping = {
    [PriceChangeStatus.UP]: 'bg-green-05',
    [PriceChangeStatus.DOWN]: 'bg-red-05',
    [PriceChangeStatus.SAME]: '',
  };

  const checkIsNewPrice = (price: string) => {
    const isNewPrice = !previousData.current?.some((order: OrderBookDataItem) => {
      return bn(order.price).isEqualTo(price);
    });
    return isNewPrice;
  };

  const getPriceChangeBackgroundColor = (price: string) => {
    if (checkIsNewPrice(price)) {
      return type === QuoteType.ASKS ? 'bg-red-05' : 'bg-green-05';
    }
    return '';
  };

  const checkQuantityChangeStatus = (price: string, quantity: string) => {
    const samePreviousOrder = previousData.current?.find((order: OrderBookDataItem) => order.price === price);

    if (!samePreviousOrder) return PriceChangeStatus.SAME;
    if (bn(quantity).isGreaterThan(samePreviousOrder.quantity)) return PriceChangeStatus.UP;
    if (bn(quantity).isLessThan(samePreviousOrder.quantity)) return PriceChangeStatus.DOWN;
    return PriceChangeStatus.SAME;
  };

  useEffect(() => {
    if (!orderData || orderData[type].length < targetDataCount) return;
    // 因為ask 也是多到少的排序，所以要先倒過來做加總動作，在加總完成後再倒過來（少到多）
    const orders =
      type === QuoteType.ASKS
        ? orderData.asks.slice(0, targetDataCount).reverse()
        : orderData.bids.slice(0, targetDataCount);

    const formattedOrders = transformOrderData(orders);

    setOrderRows(type === QuoteType.ASKS ? formattedOrders.reverse() : formattedOrders);
  }, [orderData, type]);

  useEffect(() => {
    if (!orderRows) return;
    const targetRows = type === QuoteType.ASKS ? orderRows[0] : orderRows[targetDataCount - 1];
    setMaxQuantity(targetRows ? targetRows.totalQuantity : '0');
    previousData.current = orderRows;
  }, [orderRows, type]);

  return (
    <div className="overflow-hidden">
      {orderRows.map((item: OrderBookDataItem) => {
        const priceChangeBackgroundColor = getPriceChangeBackgroundColor(item.price);
        const quantityChangeStatus = checkQuantityChangeStatus(item.price, item.quantity);

        return (
          <div
            key={item.price}
            className={cn(
              'flex text-sm py-1 px-3 font-bold relative hover:bg-blue-dark cursor-pointer',
              priceChangeBackgroundColor,
            )}
          >
            <div className={cn('w-[29%]', type === QuoteType.ASKS ? 'text-red' : 'text-green')}>
              <p>
                {formateNumber({
                  price: item.price,
                  decimalPlaces: 1,
                })}
              </p>
            </div>
            <div className={cn('w-[30%] flex justify-end', quantityBackgroundColorMapping[quantityChangeStatus])}>
              <p>
                {formateNumber({
                  price: item.quantity,
                  decimalPlaces: 0,
                })}
              </p>
            </div>
            <div className="w-[41%] flex justify-end">
              <p>
                {formateNumber({
                  price: item.totalQuantity,
                  decimalPlaces: 0,
                })}
              </p>
            </div>
            <div
              style={{
                transform: `translateX(${Math.abs(100 - (Number(item.quantity) / Number(maxQuantity)) * 100)}%)`,
              }}
              className={cn(
                'top-0  w-full h-full right-0 transition-transform duration-300 absolute',
                type === QuoteType.ASKS ? 'bg-red-012' : 'bg-green-012',
              )}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default QuotesInfo;
