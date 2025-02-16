import type { Meta, StoryObj } from "@storybook/vue3";

import TradesInfo from "./TradesInfo.vue";

const meta: Meta<typeof TradesInfo> = {
  component: TradesInfo,
};

export default meta;
type Story = StoryObj<typeof TradesInfo>;

export const Template: Story = {
  render: (args) => ({
    components: { TradesInfo },
    setup() {
      return { args };
    },
    template: `<TradesInfo v-bind="args"></TradesInfo>`,
  }),
  args: {
    // Add default props here
  },
  argTypes: {
    // Add argTypes here
  },
};
