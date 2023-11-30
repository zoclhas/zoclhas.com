import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {'tuscany': {
    '50': 'hsl(35, 60%, 96%)',
    '100': 'hsl(36, 61%, 89%)',
    '200': 'hsl(35, 61%, 77%)',
    '300': 'hsl(33, 61%, 65%)',
    '400': 'hsl(31, 61%, 56%)',
    '500': 'hsl(25, 58%, 50%)',
    '600': 'hsl(19, 60%, 46%)',
    '700': 'hsl(13, 58%, 37%)',
    '800': 'hsl(10, 53%, 31%)',
    '900': 'hsl(9, 50%, 26%)',
    '950': 'hsl(9, 58%, 14%)',
},

    },
  },
  plugins: [],
}
export default config
