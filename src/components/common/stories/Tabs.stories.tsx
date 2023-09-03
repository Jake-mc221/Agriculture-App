import type { Meta, StoryObj } from "@storybook/react";

import { Tabs } from "../Tabs";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const options = [
  {
    name: "Tab 1",
    content: "Content 1",
  },
  {
    name: "Tab 2",
    content: "Content 2",
  },
  {
    name: "Tab 3",
    content: "Content 3",
  },
];

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => (
    <div className="h-full flex flex-col items-center justify-center gap-5">
      <Tabs options={options} />
    </div>
  ),
};
