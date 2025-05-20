import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif']
      },
      colors: {
        primary: {
          from: '#ff5e62',
          to: '#ff9966',
        },
      },
    },
  },
  plugins: [],
};

export default config; 