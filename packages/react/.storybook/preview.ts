import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { blueTheme, orangeTheme } from "@taytay-ui/css/css-modules/themes.module.css";

const preview: Preview = {
  decorators: [
    // @ts-ignore
    withThemeByClassName({
      themes: {
        blue: blueTheme,
        orange: orangeTheme,
      },
      defaultTheme: "blue",
    }),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [{ id: "color-contrast", reviewOnFail: true }],
      },
    },
  },
};

export default preview;
