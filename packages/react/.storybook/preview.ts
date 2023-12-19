import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { coolTheme, funTheme } from "@taytay-ui/css/css-modules/themes.module.css";

const preview: Preview = {
  decorators: [
    // @ts-ignore
    withThemeByClassName({
      themes: {
        fun: funTheme,
        cool: coolTheme,
      },
      defaultTheme: "fun",
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
  },
};

export default preview;
