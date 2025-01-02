/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: "#00c200",
        lightGreen: "#dff8e1",
        secondary: "#caefcd",
        borderColor: "#f0f1f2",
        primaryText: "#0e0e0e",
        secondaryText: "#8c8c8c",
        redText: "#e4696d",
        generalText: "#101010",
        headerTest: "#1d1d1d",
        secondaryButton: "#dadada",
      },

      fontFamily: {
        epilogue: ["Epilogue"],
        inter: ["Inter"],
      },
    },
    backgroundImage: {
      "hero-img": "url('/src/assets/images/background.jpg')",
    },
  },
  plugins: [],
};
