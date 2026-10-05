import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://lordkeremello45.github.io",
  base: "/HWcontrol-Team.github.io",
  output: "static",
  compressHTML: true,
  build: {
    inlineStylesheets: "auto"
  }
});
