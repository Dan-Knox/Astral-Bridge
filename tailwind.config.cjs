const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["PlusJakartaSans", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        blink: "pusle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        widthi: "widthin 1s forwards",
        widtho: "widthout 1s backwards",
      },
      keyframes: {
        pusle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        widthin: {
          "0%": { left: "150%" },
          "100%": { left: "0%" },
        },
        widthout: {
          "0%": { left: "0%" },
          "100%": { left: "150%" },
        },
      },
      transitionProperty: {
        width: "width",
      },
      colors: {
       
        tertiary: "rgb(48, 63, 88)",
        lightTertiary: "rgb(66, 87, 122)",
        darkBackground: "rgb(15, 25, 55)"
        
      },
      spacing: {
        "630px": "630px",
        "550px": "550px",
      },
      screens: {
        sm2: "600px",
        md2: "760px",
        xs: "400px",
        mlg: "1250px",
      },
      borderRadius: {
        "32px": "32px",
      },
    },
  },
  safelist: ["bg-warning", "bg-error", "text-warning", "text-error"],
  plugins: [],
};
