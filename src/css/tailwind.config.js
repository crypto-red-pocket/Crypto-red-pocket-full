const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        lightBlue: "#8AFFF1",
        lightViolet: "#c081ff",
        lightRed: "#ff8a8a",
        lightGrey: "#c9c9c9",
        darkBlue: "#003983",
        darkestBlue: "#001123",
        darkRed: "#360000",
        darkViolet: "#1b0033",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
