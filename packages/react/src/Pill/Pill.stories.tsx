import { Meta, StoryObj } from "@storybook/react";
import { Pill } from "./Pill";

const meta = {
  component: Pill,
  tags: ["autodocs"],
} satisfies Meta<typeof Pill>;

type Story = StoryObj<typeof meta>;

export const PillStory: Story = {
  name: "Pill",
  args: {
    children: "This is a pill",
  },
};

export default meta;
