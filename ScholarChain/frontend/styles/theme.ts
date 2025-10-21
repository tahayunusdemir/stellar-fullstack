// Stellar-inspired theme configuration
export const lightTheme = {
  colors: {
    background: '#FFFFFF',
    foreground: '#000000',
    primary: '#8B5CF6',        // Scholar Purple (Educational theme)
    secondary: '#667085',
    gold: '#FFB800',           // Stellar's signature gold
    success: '#10B981',
    error: '#EF4444',
    surface: '#F9FAFB',
    border: '#E5E7EB',
  },
  fonts: {
    heading: 'var(--font-lora)',
    body: 'var(--font-inter)',
    mono: 'IBM Plex Mono, monospace',
  },
  breakpoints: {
    mobile: '0px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  border: {
    radius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      '2xl': '1.5rem',
    }
  },
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  transition: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  }
}

export const darkTheme = {
  ...lightTheme,
  colors: {
    background: '#0A0A0A',
    foreground: '#FFFFFF',
    primary: '#A78BFA',        // Lighter purple for dark mode
    secondary: '#94A3B8',
    gold: '#FFB800',
    success: '#34D399',
    error: '#F87171',
    surface: '#1A1A1A',
    border: '#2A2A2A',
  },
}

export type Theme = typeof lightTheme

