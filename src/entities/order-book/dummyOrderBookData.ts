import type {
  OrderBookData,
  OrderBookUpdate,
  OrderBookUpdateType,
} from "./T_OrderBook";

// 랜덤 가격 생성 (소수점 2자리)
const getRandomPrice = (basePrice: number, range: number): number => {
  const min = basePrice - range;
  const max = basePrice + range;
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

// 랜덤 수량 생성 (소수점 4자리)
const getRandomSize = (): number => {
  return Number((Math.random() * 10).toFixed(4));
};

// 주문 데이터 생성
const generateOrderBookData = (basePrice: number = 50000): OrderBookData => {
  const sell: Array<{ price: number; size: number }> = [];
  const buy: Array<{ price: number; size: number }> = [];

  // 10개의 매도 주문 생성
  for (let i = 0; i < 10; i++) {
    sell.push({
      price: getRandomPrice(basePrice + i * 100, 50),
      size: getRandomSize(),
    });
  }

  // 10개의 매수 주문 생성
  for (let i = 0; i < 10; i++) {
    buy.push({
      price: getRandomPrice(basePrice - i * 100, 50),
      size: getRandomSize(),
    });
  }

  // 가격순으로 정렬
  sell.sort((a, b) => a.price - b.price);
  buy.sort((a, b) => b.price - a.price);

  return { sell, buy };
};

// 업데이트 타입 랜덤 선택
const getRandomUpdateType = (): OrderBookUpdateType => {
  const randomIndex = Math.floor(Math.random() * 100);

  if (randomIndex < 1) return "reset";
  if (randomIndex < 50) return "absolute";
  return "relative";
};

// 더미 데이터 스트림 생성
export const createDummyOrderBookStream = (
  basePrice: number = 50000,
  interval: number = 3000
) => {
  let currentPrice = basePrice;

  return {
    subscribe(callback: (update: OrderBookUpdate) => void) {
      const timer = setInterval(() => {
        // 기준가 약간 변동
        currentPrice += Math.random() * 100 - 50;

        const update: OrderBookUpdate = {
          type: getRandomUpdateType(),
          data: generateOrderBookData(currentPrice),
        };

        callback(update);
      }, interval);

      // 구독 취소 함수 반환
      return () => clearInterval(timer);
    },
  };
};
