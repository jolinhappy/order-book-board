/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      text: '#F0F4F8',
      black: {
        DEFAULT: '#131B29',
        normal: '#000000',
      },
      white: {
        DEFAULT: '#FFFFFF',
        '01': '#FFFFFF1A',
      },
      blue: {
        dark: '#1E3059',
        divider: '#1B2338',
      },
      gray: {
        DEFAULT: '#718F9F',
        light: '#F0F4F8',
        '012': '#8698AA1F',
      },
      red: {
        DEFAULT: '#FF5B5A',
        '05': '#FF5B5A80',
        '012': '#FF5A5A1F',
      },
      green: {
        DEFAULT: '#00b15d',
        '05': '#00B15D80',
        '012': '#10BA681F',
      },
    },
    extend: {},
  },
  plugins: [],
};
