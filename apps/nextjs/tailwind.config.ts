import type { Config } from "tailwindcss";

import baseConfig from "@sasin91/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
} satisfies Config;
