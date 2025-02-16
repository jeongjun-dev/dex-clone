import type { Meta, StoryObj } from "@storybook/vue3";

import OrderBook from "./OrderBook.vue";

const meta: Meta<typeof OrderBook> = {
  component: OrderBook,
};

export default meta;
type Story = StoryObj<typeof OrderBook>;

export const Template: Story = {
  render: (args) => ({
    components: { OrderBook },
    setup() {
      return { args };
    },
    template: `<OrderBook v-bind="args">
    asd
    </OrderBook>`,
  }),
  args: {
    // Add default props here
  },
  argTypes: {
    // Add argTypes here
  },
};
