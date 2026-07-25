/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14181C",
        ink2: "#1D2329",
        brass: "#B8935B",
        brassLight: "#D8B98A",
        verdigris: "#4C7A6E",
        paper: "#EDE7DC",
        textLight: "#F2EFE9",
        muted: "#8B8F92",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["'Work Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
