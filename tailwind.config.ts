import type { Config } from 'tailwindcss'

// KSI Colors
const ksiColors = {
  primary: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#e02725', // Main KSI Red
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  secondary: {
    25: '#FFFCF9', //Branco principal menos rosa
    50: '#fdf6ef', // Branco principal
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#112331', // Corporate Blue
    900: '#0f172a',
  }
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: '#__next',
  theme: {
    extend: {
      colors: {
        primary: ksiColors.primary,
        secondary: ksiColors.secondary,
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

export default config