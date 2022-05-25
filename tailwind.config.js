module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#e65400",
          "secondary": "#99c4e8",
          "accent": "#4a0689",
          "neutral": "#d6d3d1", // Should be gray - represents disabled
          "base-100": "#ffffff",
          "info": "#3D67D1",
          "success": "#1F7F4D",
          "warning": "#F89E16",
          "error": "#DE342B",
        },
      },
    ],
  },
  theme: {
    colors: {
      disabledColor: '#F2F2F2',
      primary: '##282c34',
      orange: {
        primary: '#e65400',
        dark: '#c74a27',
      },
      gray: {
        gray1: '#fafafa',
        gray2: '#eaeaea',
        gray3: '#e2e2e2',
        gray4: '#bdbdbd',
        gray5: '#828282',
      },
      black: {
        light: '#464a4c',
        dark: '#101022',
      },
      blue: {
        skyblue: '#87CEFA',
      },
      white: '#ffffff',
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
};
