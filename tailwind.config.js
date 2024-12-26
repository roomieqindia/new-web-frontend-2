// tailwind.config.js
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        like: "heartLike 0.3s ease-in-out", // Add custom animation for heart "like"
        'fade-in-down': 'fade-in-down 0.5s ease-out' // Add custom animation for fade-in-down
      },
      keyframes: {
        heartLike: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  variants: {
    backdropFilter: ["responsive"], // Enable responsiveness for backdrop utilities
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
};
