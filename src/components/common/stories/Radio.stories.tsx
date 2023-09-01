import type { Meta, StoryObj } from "@storybook/react";

import { Radio } from "../Radio";

const meta: Meta<typeof Radio> = {
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

const testOptions = [
  {
    name: "Option 1",
    description: "description",
  },
  {
    name: "Option 2",
    description: "description",
  },
  {
    name: "Option 3",
    description: "description",
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
      <Radio options={testOptions} />
    </div>
  ),
};
