export interface OrderBookItem {
  price: number;
  size: number;
}

export interface OrderBookData {
  sell: OrderBookItem[];
  buy: OrderBookItem[];
}

export type OrderBookUpdateType = "absolute" | "relative" | "reset";

export interface OrderBookUpdate {
  type: OrderBookUpdateType;
  data: OrderBookData;
}
