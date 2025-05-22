/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'eco-green': {
            50: '#f0f9f0',
            100: '#dcf0dc',
            200: '#b9e1bd',
            300: '#8fc994',
            400: '#5dab67',
            500: '#3d8a48',
            600: '#2f6e39',
            700: '#295730',
            800: '#24462a',
            900: '#1e3a24',
          },
          'eco-brown': {
            50: '#faf5f0',
            100: '#f2e6d5',
            200: '#e4ccad',
            300: '#d3aa7c',
            400: '#c2874f',
            500: '#b47040',
            600: '#9a5933',
            700: '#7b442c',
            800: '#653a29',
            900: '#533226',
          },
        },
      },
    },
    plugins: [],
  }