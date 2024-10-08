/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./src/**/*.{html,js}",
    "./js/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'DesaturatedDarkCyan': 'hsl(180, 29%, 50%)',
        'white': '#fff',
        'LightGrayishCyanBg': 'hsl(180, 52%, 96%)',
        'LightGrayishCyan': 'hsl(180, 31%, 95%)',
        'DarkGrayishCyan': 'hsl(180, 8%, 52%)',
        'VeryDarkGrayishCyan': 'hsl(180, 14%, 20%)',
      },
      fontFamily: {
        'league': 'League Spartan'
      }
    }
  },
  plugins: [],
}