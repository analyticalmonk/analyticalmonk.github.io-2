import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#4fb1ba',
        'accent-hover': '#3a9099',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '70ch',
            color: '#374151',
            a: {
              color: '#4fb1ba',
              textDecoration: 'none',
              '&:hover': {
                color: '#3a9099',
                textDecoration: 'underline',
              },
            },
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
