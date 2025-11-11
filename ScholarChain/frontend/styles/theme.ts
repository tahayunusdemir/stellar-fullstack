// Stellar-inspired theme configuration
// Based on stellar.org best practices
const createColor = (hex: string) => ({
  toString: () => hex,
  isDark: () => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma < 128;
  },
  alpha: (value: number) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return `rgba(${r}, ${g}, ${b}, ${value})`;
  }
});

export const lightTheme = {
  colors: {
    background: createColor('#FFFFFF'),
    foreground: createColor('#1F2937'),
    primary: createColor('#8B5CF6'),
    secondary: createColor('#6B7280'),
    gold: createColor('#FFB800'),
    success: createColor('#10B981'),
    error: createColor('#EF4444'),
    surface: createColor('#F3F4F6'),
    border: createColor('#D1D5DB'),
    overlay: {
      light: 'rgba(0, 0, 0, 0.3)',
      dark: 'rgba(0, 0, 0, 0.1)',
    },
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
    mobileFirst: (values: any) => {
      const keys = Object.keys(values);
      return keys.map(key => {
        if (key === 'mobile' || key === 'small') return values[key];
        const bp = (lightTheme.breakpoints as any)[key];
        return bp ? `@media (min-width: ${bp}) { ${values[key]} }` : values[key];
      }).join(' ');
    },
  },
  grid: {
    columns: 12,
    gap: '1rem',
    maxWidth: '1440px',
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
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  transition: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  },
  designTokens: {
    colors: {
      gold: {
        50: '#FFFBEB',
        100: '#FFF3C6',
        500: '#FFB800',
        600: '#E5A500',
        900: '#664900',
      },
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        500: '#6B7280',
        900: '#111827',
      },
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
    animation: {
      duration: {
        fast: '0.15s',
        normal: '0.2s',
        slow: '0.3s',
      },
      easing: {
        default: 'ease',
        in: 'ease-in',
        out: 'ease-out',
        inOut: 'ease-in-out',
      },
    },
  }
}

export const darkTheme = {
  ...lightTheme,
  colors: {
    background: createColor('#0A0A0A'),
    foreground: createColor('#F9FAFB'),
    primary: createColor('#A78BFA'),
    secondary: createColor('#9CA3AF'),
    gold: createColor('#FFB800'),
    success: createColor('#34D399'),
    error: createColor('#F87171'),
    surface: createColor('#1F1F1F'),
    border: createColor('#374151'),
    overlay: {
      light: 'rgba(255, 255, 255, 0.05)',
      dark: 'rgba(255, 255, 255, 0.1)',
    },
  },
  shadow: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(255, 255, 255, 0.03)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(255, 255, 255, 0.05)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 10px 10px -5px rgba(255, 255, 255, 0.05)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 10px 20px -5px rgba(255, 255, 255, 0.03)',
  },
}

export type Theme = typeof lightTheme
