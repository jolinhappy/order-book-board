import QuotesInfo from '@/components/QuotesInfo';
import { QuoteType } from '@/types/order';
import CurrentPriceInfo from '@/components/CurrentPriceInfo';
import useOrderData from '@/hooks/useOrderData';

const OrderBoard = () => {
  const orderData = useOrderData();
  const askData = orderData?.asks.filter((order) => Number(order[1]) !== 0) || [];
  const bidsData = orderData?.bids || [];
  return (
    <div className="bg-black w-80">
      <p className="py-1 px-3 font-bold border-b border-blue-divider">Order Book</p>
      {/* title */}
      <div className="flex text-gray text-xs py-1 px-3">
        <div className="w-[29%]">
          <p>Price (USD)</p>
        </div>
        <div className="w-[30%] flex justify-end">
          <p>Size</p>
        </div>
        <div className="w-[41%] flex justify-end">
          <p>Total</p>
        </div>
      </div>
      <QuotesInfo orderData={askData} type={QuoteType.ASKS} />
      <CurrentPriceInfo />
      <QuotesInfo orderData={bidsData} type={QuoteType.BIDS} />
    </div>
  );
};

export default OrderBoard;
