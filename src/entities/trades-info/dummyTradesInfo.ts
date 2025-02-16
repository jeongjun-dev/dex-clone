export interface PriceData {
  direction: "buy" | "sell";
  price: number;
  size: number;
  time: string;
}

export interface TradeData {
  symbol: string;
}

let lastPrice = 11.2;
let lastTime = new Date();
lastTime.setHours(7, 44, 15);

export function generateNewTrade(): PriceData {
  // 가격 변동 (-0.05 ~ +0.05 랜덤)
  const priceChange = (Math.random() - 0.5) * 0.1;
  lastPrice = Number((lastPrice + priceChange).toFixed(2));

  // 시간 업데이트 (1초씩 +)
  lastTime = new Date(lastTime.getTime() + 1000);

  return {
    direction: Math.random() > 0.5 ? "buy" : "sell",
    price: lastPrice,
    size: Math.floor(Math.random() * 900) + 100, // 100-1000 사이 랜덤
    time: lastTime.toTimeString().slice(0, 8),
  };
}

export const dummyPriceData: PriceData[] = [
  { direction: "buy", price: 10.5, size: 100, time: "07:40:46" },
  { direction: "buy", price: 10.55, size: 150, time: "07:41:02" },
  { direction: "buy", price: 10.6, size: 200, time: "07:41:15" },
  { direction: "sell", price: 10.65, size: 250, time: "07:41:30" },
  { direction: "buy", price: 10.7, size: 300, time: "07:41:45" },
  { direction: "sell", price: 10.75, size: 350, time: "07:42:00" },
  { direction: "buy", price: 10.8, size: 400, time: "07:42:15" },
  { direction: "sell", price: 10.85, size: 450, time: "07:42:30" },
  { direction: "buy", price: 10.9, size: 500, time: "07:42:45" },
  { direction: "sell", price: 10.95, size: 550, time: "07:43:00" },
  { direction: "buy", price: 11, size: 600, time: "07:43:15" },
  { direction: "buy", price: 11.05, size: 650, time: "07:43:30" },
  { direction: "buy", price: 11.1, size: 700, time: "07:43:45" },
  { direction: "sell", price: 11.15, size: 750, time: "07:44:00" },
  { direction: "buy", price: 11.2, size: 800, time: "07:44:15" },
];

export const dummyTradeData: TradeData[] = [{ symbol: "HYPE" }];
