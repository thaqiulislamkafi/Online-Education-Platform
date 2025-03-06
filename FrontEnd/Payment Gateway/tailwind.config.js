/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        backgroundImage: theme => ({
          'gradient-to-45': 
              'linear-gradient(45deg, #53DB3A, #FFFFFF)',
          'gradient-to-135': 
              'linear-gradient(135deg, #ffed4a, #ff3860)',
          // You can add more custom classes here
        })
      },
    },
    plugins: [],
  }