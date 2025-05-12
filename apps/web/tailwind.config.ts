// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./app/**/*.{tsx,ts,jsx,js}", "./components/**/*.{tsx,ts,jsx,js}"],
  presets: [sharedConfig],
};

export default config;
