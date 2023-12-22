import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    colors: {
      "noir": "#222222",
      "gules": "#FF0000",
      "argent": "#F7DB04",
      "or": "#EEEEEE",
      "transparent": "transparent",
      "current": "currentColor",
      "black": colors.black,
      "white": colors.white,
      "slate": colors.slate,
      "zinc": colors.zinc,
      "cyan": colors.cyan,
      "rose": colors.rose,
    },
  },
} as Config;
