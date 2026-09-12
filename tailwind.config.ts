import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/core/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#fbfbfa',
          subtle: '#f2f5f0',
        },
        obsidian: {
          DEFAULT: '#252724',
          hover: '#3b3e39',
          muted: '#181917',
        },
        editorial: {
          border: 'rgba(0, 0, 0, 0.08)',
          card: '#ffffff',
          text: '#1a1b18',
          muted: '#6f736a',
        },
        sage: {
          50: '#f4f7f3',
          100: '#eef2ec',
          200: '#e7f2e4',
          500: '#668c63',
          600: '#5a8357',
        },
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
