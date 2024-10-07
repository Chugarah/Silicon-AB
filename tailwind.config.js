/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue,scss}"],
  theme: {
    extend: {
      // Here you can and custom theme or override TailwindCSS standard values
      colors: {
        // Example: 'primary': '#ff0000',
      },
      fontFamily: {
        // Example: 'sans': ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Add plugins?
  ],
  mode: "jit",
};
