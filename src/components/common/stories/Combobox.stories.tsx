import type { Meta, StoryObj } from "@storybook/react";

import { ComboBox } from "../ComboBox";

const meta: Meta<typeof ComboBox> = {
  component: ComboBox,
};

export default meta;
type Story = StoryObj<typeof ComboBox>;

const options = [
  { name: "Select an option" },
  { name: "Option 1" },
  { name: "Option 2" },
  { name: "Option 3" },
  { name: "Option 4" },
  { name: "Option 5" },
];

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => (
    <div className="h-full flex flex-col items-center justify-center gap-5">
      <ComboBox options={options} getOptionName={(option) => option.name} />
    </div>
  ),
};
