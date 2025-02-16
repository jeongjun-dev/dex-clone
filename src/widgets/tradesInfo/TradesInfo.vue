<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import TradesInfoRow from "../TradesInfoRow.vue";
import {
  dummyPriceData,
  dummyTradeData,
  generateNewTrade,
} from "../../entities/trades-info/dummyTradesInfo.ts";
import type { T_PriceData } from "../../entities/trades-info/T_PriceData.ts";

const priceList = ref<T_PriceData[]>([]);
let intervalId: number;

function loadDummyData() {
  priceList.value = dummyPriceData;
}

function addNewTrade() {
  const newTrade = generateNewTrade();
  priceList.value = [newTrade, ...priceList.value.slice(0, 30)]; // 최근 30개만 유지
}

loadDummyData();
intervalId = setInterval(addNewTrade, 500); // 0.5초마다 새로운 거래 추가

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <Table>
    <TableHeader class="[&_tr]:border-none">
      <TableRow>
        <TableHead class="trades-table-head">Price</TableHead>
        <TableHead class="trades-table-head text-right">
          Size ({{ dummyTradeData[0].symbol }})
        </TableHead>
        <TableHead class="trades-table-head text-right">Time</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TradesInfoRow :list="priceList" />
    </TableBody>
  </Table>
</template>

<style lang="scss" scoped>
.trades-table-head {
  @apply text-border text-xs p-2 h-4;
}
</style>
