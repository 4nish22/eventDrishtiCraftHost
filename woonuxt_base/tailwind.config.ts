import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}', './app.vue'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
      },
      // colors: {
      //   primary: {
      //     light: '#AE7DDD',
      //     DEFAULT: process.env.PRIMARY_COLOR || '#7F54B2',
      //     dark: '#754fa3',
      //   },
      // },
         colors: {
        primary: {
          light:process.env.PRIMARY_COLOR_LIGHT || 'fFF4D4D0',
          DEFAULT: process.env.PRIMARY_COLOR || '#ff0000',
          dark: process.env.PRIMARY_COLOR_DARK || '#CC0000',
        },
      },
      aspectRatio: {
        '9/8': '1 / 1.125',
      },
      screens: {
        '2xl': '1400px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
