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
        primaryGreen: "#4a9d83",
        lightGreen: "#dff8e1",
        secondary: "#caefcd",
        borderColor: "#e5e7e8",
        primaryText: "#0e0e0e",
        secondaryText: "#525252",
        redText: "#e4696d",
        generalText: "#050614",
        headerText: "#050614",
        mainText: "0b0712",
        secondaryButton: "#dadada",
        primaryButton: "#0f1925",
        whiteTxt: "#f7fbff",
        grayColor: "#707280",
        lightGray: "#6d7481",
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
