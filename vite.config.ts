import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: "/src/app",
      pages: "/src/pages",
      shared: "/src/shared",
      widgets: "/src/widgets",
      entities: "/src/entities",
      features: "/src/features",
      mixins: "/src/shared/lib/partials/_mixins.scss",
      variables: "/src/shared/lib/partials/_variables.scss",
    },
  },
});
