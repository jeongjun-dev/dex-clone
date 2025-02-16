<script setup lang="ts">
import { computed } from "vue";
import type { PriceData } from "../entities/trades-info/dummyTradesInfo";
import { TableCell, TableRow } from "../ui/table";

defineProps<{
  list: PriceData[];
}>();

const computedPriceColor = computed(() => {
  return (direction: "buy" | "sell") => {
    return direction === "buy" ? "text-success" : "text-error";
  };
});
</script>

<template>
  <TableRow
    v-for="(item, index) in list"
    :key="index"
    class="border-none h-[24.5px]"
  >
    <TableCell
      :class="[computedPriceColor(item.direction), 'w-1/5 text-xs pl-2']"
    >
      {{ item.price }}
    </TableCell>
    <TableCell class="w-2/5 text-right text-foreground text-xs pr-1">
      {{ item.size }}
    </TableCell>
    <TableCell
      class="flex items-center gap-1 justify-end text-foreground text-xs pr-2"
    >
      {{ item.time }}
      <img src="@/assets/arrow-up-square.svg" class="w-4 h-4" />
    </TableCell>
  </TableRow>
</template>
