/* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    colors: {
      // colors text
      'text-gray-base': '#3C3D40',
      'text-gray-lighter': {
        10: 'rgba(0, 0, 0, 0.48)',
        20: 'rgba(0, 0, 0, 0.24)'
      },
      // colors gray
      black: '#000000',
      'gray-darker': {
        40: '#2A2B2D',
        30: '#545659',
        20: '#7D8086',
        10: '#A7ABB2'
      },
      'gray-base': '#D1D6DF',
      'gray-lighter': {
        10: '#DADEE5',
        20: '#E3E6EC',
        30: '#EDEFF2',
        40: '#F6F7F9'
      },
      white: '#FFFFFF',
      // colors primary
      'primary-darker': {
        30: '#1E375C',
        20: '#2D538B',
        10: '#3C6EB9'
      },
      'primary-base': '#4B8AE7',
      'primary-lighter': {
        10: '#93B9F1',
        20: '#B7D0F5',
        30: '#DBE8FA',
        40: '#EDF3FD'
      }
    },
    extend: {}
  },
  plugins: []
}
