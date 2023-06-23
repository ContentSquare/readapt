/* eslint-env node */
const daisy = require('daisyui')
const daisyThemeLight = require('daisyui/src/colors/themes')['[data-theme=light]']

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['/index.html', '../browser-extension-template/src/**/*.vue'],
  plugins: [daisy],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyThemeLight,
          primary: '#4B8AE7',
          secondary: '#6C757D',
          warning: '#DC3545',
          'warning-content': '#FFFFFF',
          '--btn-text-case': 'none'
        }
      }
    ],
    logs: false
  },
  theme: {
    screens: {
      sm: '600px',
      md: '1000px',
      lg: '1400px'
    },
    extend: {
      height: {
        'general-settings': 'min(1000px,calc(100vh - 120px))',
        'items-settings': 'min(942px,calc(100vh - 178px))'
      }
    }
  }
}
