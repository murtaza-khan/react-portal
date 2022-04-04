module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      disabledColor: '#F2F2F2',
      primary: '##282c34',
      orange: {
        orange1: '#f2994a',
        orange2: '#f58020',
        orange3: '#e65400',
        orange4: '#fd5900',
        orange5: '#eb742a',
        orange6: '#e96730',
        orange7: '#fef7f5',
      },
      gray: {
        grey1: '#333333',
        grey2: '#828282',
        grey3: '#bdbdbd',
        grey4: '#e0e0e0',
        grey5: '#f2f2f2',
        grey6: '#f6f6f6',
        grey7: '#fcfcfc',
        grey8: '#4f4f4f',
        grey9: '#181725',
        grey10: '#7c7c7c',
      },
      black: '#101022',
      white: '#FFFFFF',
      success: '#63F0BF',
      successBg: '#EFFEF9',
      info: '#EFFEF9',
      error: '#FF7777',
      errorBg: '#FFF1F1',
      warning: '#F7C659',
      warningBg: '#FBF5EB',
    },
    placeholderColor: {
      primary: '#3490dc',
      secondary: '#ffed4a',
      danger: '#e3342f',
    },
    extend: {
      borderWidth: ['last', 'first'],
      borderColor: ['last', 'first'],
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
