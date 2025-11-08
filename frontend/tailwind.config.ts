import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#00F95F', // Bright green - primary/500
          600: '#00D954',
          700: '#00A23D', // Darker green - primary/700
          800: '#008030',
          900: '#00652E', // Darkest green - primary/900
          DEFAULT: '#00A23D', // primary/700 as default
          dark: '#00652E', // primary/900
          light: '#00F95F', // primary/500
        },
        secondary: {
          DEFAULT: '#FFD700',
          light: '#FFF8DC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

