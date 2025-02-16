<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import type {
  OrderBookData,
  OrderBookUpdate,
} from "../../entities/order-book/T_OrderBook";
import { createDummyOrderBookStream } from "../../entities/order-book/dummyOrderBookData";

const orderBookData = ref<OrderBookData>({
  sell: [],
  buy: [],
});

// 누적 수량 계산
const calculateAccumulatedSize = (orders: Array<{ size: number }>) => {
  let acc = 0;
  return orders.map((order) => {
    acc += order.size;
    return acc;
  });
};

const updateOrderBook = (update: OrderBookUpdate) => {
  switch (update.type) {
    case "absolute":
      // 새로운 데이터 추가
      mergeOrderBookData(update.data);
      break;
    case "relative":
      // 기존 데이터 교체
      orderBookData.value = update.data;
      break;
    case "reset":
      // 데이터 초기화
      orderBookData.value = {
        sell: [],
        buy: [],
      };
      break;
  }
};

const mergeOrderBookData = (newData: OrderBookData) => {
  orderBookData.value = {
    sell: [...orderBookData.value.sell, ...newData.sell]
      .sort((a, b) => b.price - a.price)
      .slice(0, 10),
    buy: [...orderBookData.value.buy, ...newData.buy]
      .sort((a, b) => a.price - b.price)
      .slice(0, 10),
  };
};

const calculateSellBarWidth = computed(() => (sell: { size: number }) => {
  const maxSize = Math.max(
    ...orderBookData.value.sell.map((order) => order.size)
  );
  return {
    width: `${(sell.size / maxSize) * 100}%`,
    backgroundColor: "rgba(255, 59, 59, 0.1)",
    left: 0,
  };
});

const calculateBuyBarWidth = computed(() => (buy: { size: number }) => {
  const maxSize = Math.max(
    ...orderBookData.value.buy.map((order) => order.size)
  );
  return {
    width: `${(buy.size / maxSize) * 100}%`,
    backgroundColor: "rgba(59, 255, 59, 0.1)",
    left: 0,
  };
});

const stream = createDummyOrderBookStream();
const unsubscribe = stream.subscribe(updateOrderBook);

onUnmounted(() => {
  unsubscribe();
});
</script>

<template>
  <div class="order-book-container">
    <!-- Sell Orders -->
    <Table class="sell-table">
      <TableHeader class="[&_tr]:border-none">
        <TableRow>
          <TableHead class="order-book-head">Price</TableHead>
          <TableHead class="order-book-head text-right">Size</TableHead>
          <TableHead class="order-book-head text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="(sell, index) in orderBookData.sell"
          :key="sell.price"
          class="relative border-none"
        >
          <td>
            <div class="bg-overlay" :style="calculateSellBarWidth(sell)" />
            <span class="text-red-500">{{ sell.price.toFixed(4) }}</span>
          </td>
          <td class="text-right">{{ sell.size.toFixed(4) }}</td>
          <td class="text-right text-foreground">
            {{ calculateAccumulatedSize(orderBookData.sell)[index].toFixed(4) }}
          </td>
        </TableRow>

        <!-- 빈 행 추가 -->
        <TableRow
          v-for="i in Math.max(0, 10 - orderBookData.sell.length)"
          :key="`empty-sell-${i}`"
        >
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </TableRow>
      </TableBody>
    </Table>

    <!-- Spread -->
    <div class="spread-row">
      <span>
        스프레드:
        {{
          (
            (orderBookData.sell[0]?.price || 0) -
            (orderBookData.buy[0]?.price || 0)
          ).toFixed(4)
        }}
      </span>
    </div>

    <!-- Buy Orders -->
    <Table class="buy-table">
      <TableHeader class="[&_tr]:border-none">
        <TableRow>
          <TableHead class="order-book-head">Price</TableHead>
          <TableHead class="order-book-head text-right">Size</TableHead>
          <TableHead class="order-book-head text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="(buy, index) in orderBookData.buy"
          :key="buy.price"
          class="relative border-none"
        >
          <td>
            <div class="bg-overlay" :style="calculateBuyBarWidth(buy)" />
            <span class="text-success">{{ buy.price.toFixed(4) }}</span>
          </td>
          <td class="text-right">{{ buy.size.toFixed(4) }}</td>
          <td class="text-right text-foreground">
            {{ calculateAccumulatedSize(orderBookData.buy)[index].toFixed(4) }}
          </td>
        </TableRow>

        <!-- 빈 행 추가 -->
        <TableRow
          v-for="i in Math.max(0, 10 - orderBookData.buy.length)"
          :key="`empty-buy-${i}`"
        >
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style lang="scss" scoped>
.order-book-container {
  @apply w-full max-w-md mx-auto font-mono min-h-[749px];
}

.order-book-head {
  @apply text-border text-xs p-2 h-4;
}

.spread-row {
  @apply p-2 text-center bg-muted text-sm;
}

.bg-overlay {
  @apply absolute top-0 h-full z-0;
}

td {
  @apply p-2 relative z-10 h-[24.5px];
}

.sell-table,
.buy-table {
  @apply w-full;
}

TableRow {
  @apply h-[24.5px];
}
</style>
