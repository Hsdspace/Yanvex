/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        dark: {
          900: '#050505',
          800: '#111111',
          700: '#262626',
        },
        // Accent colors
        cyan: {
          400: '#d4d4d4',
          500: '#a3a3a3',
        },
        purple: {
          600: '#737373',
          500: '#525252',
        },
        // Text colors
        slate: {
          100: '#f5f5f5',
          200: '#e5e5e5',
          400: '#a3a3a3',
          500: '#737373',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(255, 255, 255, 0.12)',
        'glow-lg': '0 0 40px rgba(255, 255, 255, 0.18)',
        'glow-purple': '0 0 20px rgba(163, 163, 163, 0.18)',
        inner: 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(115, 115, 115, 0.08) 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(115, 115, 115, 0.06) 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide': 'slide 20s linear infinite',
        'slide-reverse': 'slide-reverse 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'slide-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '1.2' }],
        '6xl': ['60px', { lineHeight: '1.1' }],
      },
    },
  },
  plugins: [],
}
