module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Oswald', 'ui-sans-serif'],
      },
      backgroundImage: theme => ({
        'spyfall': "url('/src/resources/spyfall.png')",
      }),
      backgroundColor: theme => ({
        'background': '#14161A',
        'primary': '#21252A',
        'secondary': '#525962',
        'button': '#BE3333',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
