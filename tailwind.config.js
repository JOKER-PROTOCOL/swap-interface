/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './constants/**/*.{js,ts,jsx,tsx,mdx}',
    './icons/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      screen: {
        sm: '375px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
      opacity: {
        45: '.45',
      },
      spacing: {
        7.5: '30px',
        15: '60px',
      },
      boxShadow: {
        lg: '0px 8px 24px 0px rgba(0, 0, 0, 0.15)',
      },
      colors: {
        strongRed: '#750603',
        lightRed: '#BA8381',
        paleOrange: '#FFDFAF',
        layerGray: '#F4F4F4',
        spunPearl: '#A1A1A9',
        strongOrange: '#FF9F10',
        grayBlue: '#ced4db',
        lightGray: {
          500: '#A7A9AC',
          700: '#46484D',
          900: '#9CA1B4',
        },
        darkGray: '#2A2A34',
        blackBlue: '#191D27', // similar to '#161619'?
        grayBorder: {
          500: '#515166',
          800: '#EBEBEB',
        },
        darkGrayBlue: {
          300: '#7C8189',
          700: '#30343D',
          900: '#181A20',
        },
        darkGreen: '#228D5B',
        disabled: '#191C26',
        // primary: '#191C26',
        lineBlack: '#191C26',
        warning: '#FA8C16',

        // below is new
        primary: '#191C26',
        secondary: '#515166',
        third: '#A1A1A9',
        line: '#EBEBEB',
        lineGray: '#EBEBEB',
        icon: '#191D27',
        bg3: '#F4F4F4',
        lightBlue: '#E3EAF2',
        bgGreen: '#EAFDF3',
        lightGreen: '#2AEA86',
        icon: 'rgba(25, 28, 38, 0.40)',
        alert: 'rgba(250, 22, 22, 0.30)',
        black: {
          700: 'rgba(25, 28, 38, 0.40)', // #191C2666
          800: '#191C26',
        },
        green: {
          100: 'rgba(42, 234, 134, 0.05);',
          500: '#2AEA86',
        },
        googleGreen: '#33691D',
        alert: '#FA1616',
        warmingUp: '#FF5B00',
        referral: {
          100: 'rgba(229, 233, 233, 0.50)',
          110: '#E5E9E9',
          200: 'rgba(242, 236, 208, 0.50)',
          210: '#F2ECD0',
          300: 'rgba(234, 221, 235, 0.30)',
          310: '#EADDEB',
          400: 'rgba(206, 212, 232, 0.30)',
          410: '#CED4E8',
          510: 'rgba(156, 111, 24, 0.30)',
          610: 'rgba(137, 128, 142, 0.30)',
        },
        cardPlatinum: '#ADB4B4',
        cardDiamond: '#8B488F',
        cardGenesis: '#9C6F18',
        zkLink: '#0BC48F',
        bgOkx: '#0e0e0e',
      },
      borderRadius: {
        '2lg': '16px',
        '3lg': '24px',
        '3xl': '36px',
      },
      fontSize: {
        xxs: '0.625rem', // 10px
        '5xl': '3.125rem',
      },
      backgroundImage: {
        referralBg3: 'url(/images/referralBg3.png)',
      },
    },
    fontFamily: {
      body: ['Red Hat Display'],
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: '32px', lineHeight: '32px' },
        // h2: { fontSize: theme('fontSize.xl') },
        // h3: { fontSize: theme('fontSize.lg') },
      }),
        require('flowbite/plugin')
    }),
  ],
}
