/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        title: ['Epilogue', 'sans-serif'],
        font: ['Segoe UI', 'sans-serif'],
      },
      fontSize: {
        headingEx: '72px',
        heading1: '64px',
        heading2: '56px',
        heading3: '40px',
        heading4: '32px',
        fontL: '24px',
        fontM: '18px',
        fontS: '14px',
        fontXS: '12px',
      },
      colors: {
        pricolor: '#F6F7F8',
        secdcolor: '#21212D',
        thircolor: '#037171'
      }
    },
  },
  plugins: [],
}

