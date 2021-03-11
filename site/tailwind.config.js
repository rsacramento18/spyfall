module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lato', 'ui-sans-serif'],
      },
      backgroundImage: theme => ({
        'main-background': "url('/src/resources/mainBackground.jpg')",
        'pattern': "url('/src/resources/what-the-hex.png')",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
