import { type Meta, type StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { userEvent, within } from "@storybook/testing-library";

const meta = {
  title: "Inputs/Button",
  component: Button,
  parameters: {
    docs: {
      argTypes: {
        exclude: ["as"],
      },
    },
  },
  argTypes: {
    as: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {
  name: "Button",
  args: {
    children: "BUTTON",
    color: "primary",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button"));
  },
  argTypes: {
    onClick: {
      table: {
        disable: true,
      },
    },
  },
};

export const Variants: Story = {
  parameters: {
    controls: {
      include: ["color", "disabled", "fullWidth", "size"],
    },
  },
  args: {
    children: undefined,
  },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Button {...args} variant="plain">
        plain
      </Button>
      <Button {...args} variant="outline">
        outline
      </Button>
      <Button {...args} variant="soft">
        soft
      </Button>
      <Button {...args} variant="solid">
        solid
      </Button>
      <Button {...args} variant="achromatic">
        achromatic
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: {
      include: ["children", "color", "disabled", "fullWidth", "variant"],
    },
  },
  args: {
    children: "Button",
  },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
      <Button {...args} size="xl" />
      <Button {...args} size="lg" />
      <Button {...args} size="md" />
      <Button {...args} size="sm" />
      <Button {...args} size="xs" />
    </div>
  ),
};

export const Colors: Story = {
  parameters: {
    controls: {
      include: ["variant", "disabled", "fullWidth", "size"],
    },
  },
  args: {
    children: undefined,
    variant: "solid",
  },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
      <Button {...args} color="primary">
        primary
      </Button>
      <Button {...args} color="secondary">
        secondary
      </Button>
      <Button {...args} color="neutral">
        neutral
      </Button>
      <Button {...args} color="danger">
        danger
      </Button>
      <Button {...args} color="info">
        info
      </Button>
      <Button {...args} color="success">
        success
      </Button>
      <Button {...args} color="warning">
        warning
      </Button>
    </div>
  ),
};

export const Link: Story = {
  parameters: {
    controls: {
      include: ["children", "href", "color", "disabled", "fullWidth", "size", "variant"],
    },
  },
  args: {
    children: "I'm an anchor element",
    as: "a",
    href: "/",
    style: { textDecoration: "auto" },
  },
};

export const ButtonWithIconAndLabel: Story = {
  parameters: {
    controls: {
      include: ["variant", "color", "disabled", "fullWidth", "size"],
    },
  },
  args: {
    children: undefined,
  },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Button {...args} variant="outline">
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V6H17H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V8H5C4.44772 8 4 7.55228 4 7C4 6.44772 4.44772 6 5 6H7H9V5ZM10 8H8V18C8 18.5523 8.44772 19 9 19H15C15.5523 19 16 18.5523 16 18V8H14H10ZM13 6H11V5H13V6ZM10 9C10.5523 9 11 9.44772 11 10V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V10C9 9.44772 9.44772 9 10 9ZM14 9C14.5523 9 15 9.44772 15 10V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V10C13 9.44772 13.4477 9 14 9Z"
              fill="currentcolor"
            />
          </svg>
          DELETE
        </>
      </Button>
      <Button {...args}>
        <>
          SEND
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.3938 2.20468C3.70395 1.96828 4.12324 1.93374 4.4679 2.1162L21.4679 11.1162C21.7953 11.2895 22 11.6296 22 12C22 12.3704 21.7953 12.7105 21.4679 12.8838L4.4679 21.8838C4.12324 22.0662 3.70395 22.0317 3.3938 21.7953C3.08365 21.5589 2.93922 21.1637 3.02382 20.7831L4.97561 12L3.02382 3.21692C2.93922 2.83623 3.08365 2.44109 3.3938 2.20468ZM6.80218 13L5.44596 19.103L16.9739 13H6.80218ZM16.9739 11H6.80218L5.44596 4.89699L16.9739 11Z"
              fill="currentcolor"
            />
          </svg>
        </>
      </Button>
    </div>
  ),
};

export const RectangularIconButton: Story = {
  parameters: {
    controls: {
      include: ["variant", "color", "disabled", "fullWidth", "size"],
    },
  },
  args: {
    children: (
      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.3938 2.20468C3.70395 1.96828 4.12324 1.93374 4.4679 2.1162L21.4679 11.1162C21.7953 11.2895 22 11.6296 22 12C22 12.3704 21.7953 12.7105 21.4679 12.8838L4.4679 21.8838C4.12324 22.0662 3.70395 22.0317 3.3938 21.7953C3.08365 21.5589 2.93922 21.1637 3.02382 20.7831L4.97561 12L3.02382 3.21692C2.93922 2.83623 3.08365 2.44109 3.3938 2.20468ZM6.80218 13L5.44596 19.103L16.9739 13H6.80218ZM16.9739 11H6.80218L5.44596 4.89699L16.9739 11Z"
          fill="currentcolor"
        />
      </svg>
    ),
    "aria-label": "send-icon",
  },
};

export default meta;
