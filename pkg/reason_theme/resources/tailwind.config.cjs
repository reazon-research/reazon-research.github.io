/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../theme/**/*.html', './**/*.{js,ts,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          100: '#F2F8FF',
          800: '#002550',
        },
        gray: {
          50: '#eeeeee',
          100: '#dddddd',
          200: '#cccccc',
          300: '#aaaaaa',
          400: '#999999',
          500: '#666666',
          600: '#424242',
          700: '#444444',
          800: '#333333',
          900: '#222222',
        },
        zinc: {
          50: '#f9f9f9',
          100: '#f8f8f8',
        },
        red: {
          600: '#C50000',
        },
        blue: {
          400: '#61B2FF',
          500: '#1983E7',
        },
      },
      fontSize: {
        titleSm: '28px',
        titleLg: '36px',
      },
      borderWidth: {
        3: '3px',
        7: '7px',
      },
    },
  },
  plugins: [],
};
