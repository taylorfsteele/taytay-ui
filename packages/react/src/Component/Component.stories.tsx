import { Meta, StoryObj } from "@storybook/react";
import { Component } from "./Component";

const meta = {
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComponentStory: Story = {
  name: "Component",
  args: {},
};
