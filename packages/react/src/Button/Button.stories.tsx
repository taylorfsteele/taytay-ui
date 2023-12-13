import { type Meta, type StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {
  name: "Button",
  args: {
    children: "sup",
  },
};

export default meta;
