import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f7f7fb',
        card: '#ffffff',
        accent: {
          DEFAULT: '#2b6cb0',
          dark: '#1e4a72',
          darker: '#245a8f',
        },
        muted: '#666',
        text: {
          DEFAULT: '#111',
          secondary: '#333',
          tertiary: '#666',
        },
        border: {
          DEFAULT: '#ddd',
          light: '#eee',
          lighter: '#f0f0f0',
        },
        gray: {
          light: '#f8f9fa',
          lighter: '#e9ecef',
          lightest: '#fbfbff',
        },
        dark: '#1a1a1a',
        black: 'rgba(0,0,0,1)',
        white: '#ffffff',
        warning: {
          bg: '#fff3cd',
          border: '#ffc107',
          light: '#ffeaa7',
        },
        'link-blue': '#0066cc',
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
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
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        lg: '12px',
        xl: '20px',
        full: '50%',
      },
      fontSize: {
        xs: '0.85rem',
        sm: '0.9rem',
        base: '1.1rem',
        lg: '1.2rem',
        xl: '1.3rem',
        '2xl': '1.5rem',
        '3xl': '1.8rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      maxWidth: {
        container: '1100px',
      },
      screens: {
        mobile: '720px',
        small: '480px',
        'nav-break': '1089px', // ナビゲーションリンクが改行される時点
      },
      zIndex: {
        header: '20',
        sidebar: '100',
        modal: '1000',
        'modal-close': '1001',
      },
      height: {
        header: '80px',
        'header-small': '65px',
        'header-min': '60px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.1)',
        md: '0 2px 8px rgba(0,0,0,0.1)',
        lg: '0 4px 12px rgba(0,0,0,0.15)',
        xl: '0 4px 20px rgba(0,0,0,0.15)',
        accent: '0 2px 10px rgba(0,0,0,0.1)',
        'accent-lg': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'accent-rgba': '0 4px 20px rgba(43, 108, 176, 0.1)',
      },
      opacity: {
        overlay: '0.95',
        'overlay-light': '0.5',
        'overlay-dark': '0.9',
        disabled: '0.6',
        hover: '0.7',
      },
      transitionDuration: {
        fast: '0.2s',
        base: '0.3s',
        slow: '0.4s',
        slower: '0.8s',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        menuExpand: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.5) translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        hamburgerIntro: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-50%) scale(0) rotate(-180deg)',
          },
          '60%': {
            opacity: '1',
            transform: 'translateY(-50%) scale(1.1) rotate(0deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(-50%) scale(1) rotate(0deg)',
          },
        },
        zoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.2s linear infinite',
        'fade-in': 'fadeIn 0.3s ease',
        spin: 'spin 1s linear infinite',
        'menu-expand': 'menuExpand 0.3s ease',
        'hamburger-intro': 'hamburgerIntro 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        zoom: 'zoom 10s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
