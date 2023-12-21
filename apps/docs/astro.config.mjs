import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      components: {
        Head: "./src/components/Head.astro",
        PageTitle: "./src/components/PageTitle.astro",
      },
      title: "TayTay UI",
      social: {
        github: "https://github.com/taylorfsteele/taytay-ui",
      },
      editLink: {
        baseUrl: "https://github.com/taylorfsteele/taytay-ui/edit/main/apps/docs/",
      },
      sidebar: [
        {
          label: "Getting Started",
          autogenerate: {
            directory: "getting-started",
          },
        },
        {
          label: "Styling",
          autogenerate: {
            directory: "styling",
          },
        },
        {
          label: "Components",
          autogenerate: {
            directory: "/components",
          },
        },
        {
          label: "Reference",
          autogenerate: {
            directory: "reference",
          },
        },
      ],
      customCss: ["./src/styles/custom-styles.css"],
    }),
    react(),
  ],
});
