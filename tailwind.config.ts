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
        midnight: {
          50: '#f8f9ff',
          100: '#e8eaff',
          200: '#d1d5ff',
          300: '#a8b0ff',
          400: '#7c85ff',
          500: '#5b64ff',
          600: '#4a52ff',
          700: '#3d44e6',
          800: '#3338b8',
          900: '#2e3393',
          950: '#0c0b1f',
        },
        royalGold: {
          50: '#fefdf4',
          100: '#fdf9e1',
          200: '#fbf2c3',
          300: '#f8e89a',
          400: '#f5d76e',
          500: '#f0c14b',
          600: '#e1a32e',
          700: '#bb7f25',
          800: '#966425',
          900: '#7a5222',
          950: '#462d10',
        },
        crystal: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#8a5cf5',
        },
        surface: {
          50: '#f8f9ff',
          100: '#f1f2ff',
          200: '#e4e7ff',
          300: '#c7d1ff',
          400: '#a3b3ff',
          500: '#7c8bff',
          600: '#5b64ff',
          700: '#4a52e6',
          800: '#3d44b8',
          900: '#333893',
          950: '#131327',
        },
        mystic: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        crystalPurple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#8a5cf5',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Noto Sans JP', 'sans-serif'],
        mystical: ['Cormorant Garamond', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(147, 51, 234, 0.6)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mystic-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      },
    },
  },
  plugins: [],
}

export default config 