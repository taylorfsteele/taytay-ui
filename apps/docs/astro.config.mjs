import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      components: {
        Head: "./src/components/Head.astro",
      },
      title: "My Docs",
      social: {
        github: "https://github.com/taylorfsteele/taytay-ui",
      },
      sidebar: [
        {
          label: "Getting Started",
          autogenerate: { directory: "getting-started" },
        },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", link: "/guides/example/" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      lastUpdated: true,
      customCss: ["./src/styles/custom-styles.css"],
    }),
  ],
});
