'use client'

import { createTheme } from '@mui/material/styles'

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

export const theme = createTheme({
  palette: {
    primary: {
      main: ksiColors.primary[500],
      light: ksiColors.primary[300],
      dark: ksiColors.primary[700],
    },
    secondary: {
      main: ksiColors.secondary[500],
      light: ksiColors.secondary[300],
      dark: ksiColors.secondary[800],
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'sans-serif'
    ].join(','),
    h1: {
      fontFamily: 'Poppins, Inter, system-ui',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Poppins, Inter, system-ui',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Poppins, Inter, system-ui',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
})