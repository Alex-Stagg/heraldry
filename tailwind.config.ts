import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    colors: {
      'noir': '#222222',
      'gules': '#FF0000',
      'argent': '#F7DB04',
      'or': '#EEEEEE',
    }
  }
} as Config;
