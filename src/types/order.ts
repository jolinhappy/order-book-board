export interface WebSocketResponse<T> {
  topic: string;
  data: T;
}

export interface OrderData {
  [QuoteType.BIDS]: [string, string][];
  [QuoteType.ASKS]: [string, string][];
  seqNum: number;
  prevSeqNum: number;
  type: string;
  symbol: string;
  timestamp: number;
}

// 前端畫面使用
export interface OrderBookDataItem {
  price: string;
  quantity: string;
  totalQuantity: string;
}

export enum QuoteType {
  ASKS = 'asks',
  BIDS = 'bids',
}

export enum PriceChangeStatus {
  SAME = 'same',
  UP = 'up',
  DOWN = 'down',
}

export interface PriceInfo {
  price: string;
  side: string;
  size: number;
  symbol: string;
  timestamp: number;
  tradeId: number;
}

export type OrderDataResponse = WebSocketResponse<OrderData>;
export type PriceInfoResponse = WebSocketResponse<PriceInfo[]>;
