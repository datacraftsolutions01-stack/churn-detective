import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6D28D9',
          foreground: '#FFFFFF',
        },
      },
      boxShadow: {
        'elevated': '0 10px 30px rgba(109, 40, 217, 0.25)',
      },
    },
  },
  plugins: [],
}

export default config

