import type { Meta, StoryObj } from "@storybook/react";

import { LabelCombobox } from "./Combobox";

const meta: Meta<typeof LabelCombobox> = {
  component: LabelCombobox,
};

export default meta;
type Story = StoryObj<typeof LabelCombobox>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => (
    <div className="h-full flex flex-col items-center justify-center gap-5">
      <LabelCombobox />
    </div>
  ),
};
