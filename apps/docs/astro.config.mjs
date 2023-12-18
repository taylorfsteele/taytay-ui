import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    components: {
      Head: "./src/components/Head.astro"
    },
    title: "TayTay UI",
    social: {
      github: "https://github.com/taylorfsteele/taytay-ui"
    },
    sidebar: [{
      label: "Getting Started",
      autogenerate: {
        directory: "getting-started"
      }
    }, {
      label: "Styling",
      autogenerate: {
        directory: "styling"
      }
    }, {
      label: "Components",
      autogenerate: {
        directory: "/components"
      }
    }, {
      label: "Reference",
      autogenerate: {
        directory: "reference"
      }
    }],
    lastUpdated: true,
    customCss: ["./src/styles/custom-styles.css"]
  }), react()]
});