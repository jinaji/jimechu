import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 999s linear infinite',
        zzz: 'zzz 2s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-9999%)' },
        },
        zzz: {
          from: { transform: 'translateY(0)' },
          '85%': { transform: 'translateY(0)' },
          '90%': { transform: 'translateY(-15%)' },
          '95%': { transform: 'translateY(5%)' },
          to: { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
